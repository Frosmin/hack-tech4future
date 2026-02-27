package routes

import (
	"net/http"

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
