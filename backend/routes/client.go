package routes

import (
	"mime/multipart"
	"net/http"

	"github.com/Frosmin/backend/db"
	"github.com/Frosmin/backend/models"
	routes "github.com/Frosmin/backend/routes/auth"
	"github.com/Frosmin/backend/services"

	"github.com/gin-gonic/gin"
)

func PostClientHandler(c *gin.Context) {
	var client models.Client

	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Cifrar la contraseña antes de guardarla
	if err := client.User.HashPassword(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error al cifrar la contraseña"})
		return
	}

	// Guardar cliente en la base de datos
	if err := db.DB.Create(&client).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	client.User.Password = "" // para que no se vea el hash

	c.JSON(http.StatusCreated, client)
}

func GetClientProfileHandler(c *gin.Context) {
	// 1. Obtener el userID del contexto, que fue añadido por el AuthMiddleware
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "usuario no autorizado"})
		return
	}

	var client models.Client

	//peticion
	resultado := db.DB.Preload("User").Where("user_id = ?", userID).First(&client).Error

	//si hay un error
	if resultado != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "perfil de cliente no encontrado"})
		return
	}

	//json personalizado
	c.JSON(http.StatusOK, gin.H{
		"name":         client.Name,
		"contactEmail": client.ContactEmail,
		"contactPhone": client.ContactPhone,
		"avatarUrl":    client.User.AvatarURL,
	})
}

func UpdateClientProfileHandler(c *gin.Context) {
	// 1. Obtener el userID del contexto, que fue añadido por el AuthMiddleware
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "usuario no autorizado"})
		return
	}

	var client models.Client

	//peticion
	resultado := db.DB.Preload("User").Where("user_id = ?", userID).First(&client).Error

	//si hay un error
	if resultado != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "perfil de cliente no encontrado"})
		return
	}

	var input struct {
		BusinessName string                `form:"businessName" binding:"required"`
		ContactEmail string                `form:"contactEmail" binding:"required"`
		ContactPhone string                `form:"contactPhone" binding:"required"`
		AvatarPhoto  *multipart.FileHeader `form:"avatarPhoto"`
	}

	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	client.Name = input.BusinessName
	client.ContactEmail = input.ContactEmail
	client.ContactPhone = input.ContactPhone

	if input.AvatarPhoto != nil {
		file, err := input.AvatarPhoto.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No se puede abrir la foto"})
			return
		}
		defer file.Close()

		url, err := services.UploadImage(file, "clientes_avatars")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al subir imagen: " + err.Error()})
			return
		}

		client.User.AvatarURL = url

		// guarda en la tabla de usuarios la foto
		if err := db.DB.Save(&client.User).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error al actualizar foto de usuario"})
			return
		}
	}

	if err := db.DB.Save(&client).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no se pudo actualizar el perfil"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Perfil actualizado correctamente"})
}

func LoginHandler(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "datos de inicio de sesión inválidos"})
		return
	}

	var dbUser models.User
	if err := db.DB.Where("email = ?", user.Email).First(&dbUser).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "usuario no encontrado"})
		return
	}

	if err := dbUser.CheckPassword(user.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "contraseña incorrecta"})
		return
	}

	token, err := routes.GenerateJWT(dbUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error al generar el token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "inicio de sesión exitoso",
		"token":   token,
		"user": gin.H{
			"id":    dbUser.ID,
			"email": dbUser.Email,
			"role":  dbUser.Role,
		},
	})
}
