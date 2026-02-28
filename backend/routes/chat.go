package routes

import (
	"io"
	"net/http"
	"strings"

	"github.com/Frosmin/backend/services"
	"github.com/gin-gonic/gin"
)

type ChatRequest struct {
	Question string `json:"question" binding:"required"`
}

func ChatHandler(c *gin.Context) {
	var req ChatRequest

	// Validar JSON de entrada
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Formato inválido: se requiere 'question'"})
		return
	}

	// Llamar al servicio de Gemini
	ans, err := services.GenerateAnswer(req.Question)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"answer": ans,
	})
}

// 2. HANDLER PARA IMAGEN (Multipart/Form-Data)
func ChatImageHandler(c *gin.Context) {
	// Obtener archivo
	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Se requiere un archivo 'image'"})
		return
	}

	// Obtener pregunta opcional
	question := c.PostForm("question")

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

	// Detectar formato (jpeg, png, etc.)
	// DetectContentType retorna algo como "image/jpeg" o "image/png"
	mimeType := http.DetectContentType(imageBytes)
	format := strings.TrimPrefix(mimeType, "image/")

	// Llamar al servicio
	ans, err := services.GenerateAnswerWithImage(question, imageBytes, format)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"answer": ans})
}
