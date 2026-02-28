package routes

import (
	"bytes"
	"encoding/json"
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
		"Datos del paciente que puede servirde en la evaluacion:\n- Edad: %d\n- Tipo de Sangre: %s\n- Condiciones Preexistentes: %s",
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

	photoURL, err := services.UploadImage(bytes.NewReader(imageBytes), "patologias")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al subir imagen a Cloudinary: " + err.Error()})
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

	// 1. Estructura temporal para decodificar la respuesta JSON de Gemini
	var geminiData struct {
		Title          string  `json:"title"`
		Description    string  `json:"description"`
		Gravity        string  `json:"gravity"`
		Recommendation string  `json:"recommendation"`
		Provability    float64 `json:"provability"`
		IsMedical      bool    `json:"isMedical"`
		Compuestos     []struct {
			Name string `json:"name"`
		} `json:"compuestos"`
	}

	// 2. Convertir el texto JSON a nuestra estructura temporal
	if err := json.Unmarshal([]byte(ans), &geminiData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al procesar la respuesta de la IA"})
		return
	}

	// Transformar los compuestos del JSON a la estructura del modelo (GORM)
	var compuestosParaGuardar []models.Compuesto
	for _, comp := range geminiData.Compuestos {
		compuestosParaGuardar = append(compuestosParaGuardar, models.Compuesto{
			Name: comp.Name,
		})
	}

	// 3. Crear el modelo Patologia, incluyendo sus compuestos asociados
	nuevaPatologia := models.Patologia{
		Title:       geminiData.Title,
		Description: geminiData.Description,
		Treatment:   geminiData.Recommendation,
		Gravity:     geminiData.Gravity,
		Provability: geminiData.Provability,
		IsMedical:   geminiData.IsMedical,
		UserID:      client.UserID,
		Compuestos:  compuestosParaGuardar,
		Photos: []models.Photo{
			{
				PhotoUrl: photoURL,
			},
		},
	}

	// 4. Guardar en la base de datos
	if err := db.DB.Create(&nuevaPatologia).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar en la base de datos"})
		return
	}

	// Retornar el registro ya guardado con su ID y fechas generadas
	c.JSON(http.StatusOK, nuevaPatologia)
}
