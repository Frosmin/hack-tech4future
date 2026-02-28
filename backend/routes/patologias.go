package routes

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/Frosmin/backend/db"
	"github.com/Frosmin/backend/models"
	"github.com/Frosmin/backend/services"
	"github.com/gin-gonic/gin"
)

func PostPatologia(c *gin.Context) {

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autorizado"})
		return
	}

	var client models.Client
	if result := db.DB.Where("user_id = ?", userID).First(&client); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Perfil de cliente no encontrado para este usuario"})
		return
	}

	contexto := fmt.Sprintf(
		"Datos del paciente:\n- Edad: %d\n- Tipo de Sangre: %s\n- Condiciones Preexistentes: %s",
		client.Age,
		client.BloodType,
		client.PreExistingCondition,
	)

	// Obtener archivo
	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Se requiere un archivo 'image'"})
		return
	}

	// Obtener pregunta opcional
	// question := c.PostForm("question")

	// Abrir archivo
	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo abrir la imagen"})
		return
	}
	defer file.Close()

	// Leer bytes
	imageBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo leer la imagen"})
		return
	}

	mimeType := http.DetectContentType(imageBytes)
	format := strings.TrimPrefix(mimeType, "image/")

	// Llamar al servicio
	ans, err := services.GenerateAnswerWithImage(contexto, imageBytes, format)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"answer": ans})
}
