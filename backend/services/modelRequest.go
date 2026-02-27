package services

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

// GenerateAnswer envía una pregunta a Gemini y retorna la respuesta como texto
func GenerateAnswer(question string) (string, error) {
	ctx := context.Background()
	apiKey := os.Getenv("GEMINI_KEY")

	if apiKey == "" {
		return "", errors.New("GEMINI_KEY no está configurada")
	}

	// Crear cliente
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return "", fmt.Errorf("error al crear cliente Gemini: %v", err)
	}
	defer client.Close()

	// Seleccionar el modelo (gemini-pro es para texto)
	model := client.GenerativeModel("gemini-1.5-flash")

	// Generar respuesta
	resp, err := model.GenerateContent(ctx, genai.Text(question))
	if err != nil {
		return "", fmt.Errorf("error al generar contenido: %v", err)
	}

	// Extraer el texto de la respuesta
	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		// Asumimos que la respuesta es texto simple
		if txt, ok := resp.Candidates[0].Content.Parts[0].(genai.Text); ok {
			return string(txt), nil
		}
	}

	return "", errors.New("no se pudo obtener una respuesta válida de Gemini")
}
