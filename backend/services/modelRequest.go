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
	model := client.GenerativeModel("gemini-2.5-flash")

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

func GenerateAnswerWithImage(question string, imageBytes []byte, imageFormat string) (string, error) {
	ctx := context.Background()
	apiKey := os.Getenv("GEMINI_KEY")

	if apiKey == "" {
		return "", errors.New("GEMINI_KEY no está configurada")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return "", fmt.Errorf("error al crear cliente Gemini: %v", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-flash")

	// 1. Configuración CRÍTICA: Forzar respuesta en JSON
	model.ResponseMIMEType = "application/json"

	// 2. Definir el System Prompt (El cerebro del experto)
	systemInstruction := `
    Actúa como un asistente médico experto en dermatología y análisis visual clínico.
    Tu tarea es analizar la imagen proporcionada buscando anomalías, lesiones cutáneas o signos clínicos visibles.

    INSTRUCCIONES DE RESPUESTA:
    Responde estricta y únicamente con un objeto JSON válido. No uses bloques de código markdown (como '''json), solo el raw JSON.
    
    El JSON debe seguir esta estructura exacta:
    {
        "title": "Nombre técnico de la posible condición o 'Sin hallazgos significativos'",
        "description": "Explicación detallada de lo que observas visualmente (color, forma, textura, ubicación)",
        "gravity": "Baja" | "Moderada" | "Alta" | "Desconocida",
        "recommendation": "no digas que valla donde un doctor, solo responde el tratamiento (ejmplo si es pie de atleta, responde: 'Mantener la zona seca, aplicar crema antifúngica y evitar compartir calzado')",
        "provability": Un número entero del 0 al 100 indicando tu nivel de certeza,
        "isMedical": true si la imagen parece ser de una condición médica o parte del cuerpo, false si es una foto irrelevante (un paisaje, un coche, etc.),
		"compuestos": [
			{
				"name": "Nombre del compuesto, esto es una lista de compuestos quimicos que estan en medicamentos que puede ayudar a tratar la patologia, si no se puede identificar un compuesto, dejar la lista vacia"
			}
		]
    }

    Si la imagen no es clara o no es médica, pon "isMedical": false y explica por qué en "description".
    `

	// 3. Preparar la consulta del usuario
	if question == "" {
		question = "Realiza un diagnóstico visual detallado de esta imagen."
	}

	// Combinamos la instrucción del sistema con la pregunta específica
	fullPromptText := fmt.Sprintf("%s\n\nConsulta adicional del usuario: %s", systemInstruction, question)

	// 4. Crear las parte del mensaje (Imagen + Prompt Completo)
	prompt := []genai.Part{
		genai.ImageData(imageFormat, imageBytes),
		genai.Text(fullPromptText),
	}

	// 5. Enviar a Gemini
	resp, err := model.GenerateContent(ctx, prompt...)
	if err != nil {
		return "", fmt.Errorf("error al generar contenido: %v", err)
	}

	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		if txt, ok := resp.Candidates[0].Content.Parts[0].(genai.Text); ok {
			return string(txt), nil
		}
	}

	return "", errors.New("no se pudo obtener una respuesta válida")
}

func CompareEvolution(oldImageBytes, newImageBytes []byte, contextInfo string) (string, error) {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_KEY")))
	if err != nil {
		return "", err
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-flash")
	model.ResponseMIMEType = "application/json"

	systemInstruction := `
    Actúa como un dermatólogo clínico experto. Te proporcionaré 2 imágenes de la misma lesión.
    Imagen 1 (Anterior) y Imagen 2 (Actual - Nueva).
    
    Devuelve estrictamente un JSON:
    {
        "evolutionStatus": "Mejora", "Empeoramiento" o "Sin cambios",
        "analysisSummary": "Explica brevemente los cambios. tiene que ser en 10 palabras máximo",
    }
    `

	prompt := []genai.Part{
		genai.Text(systemInstruction),
		genai.Text("Contexto de la patología inicial: " + contextInfo),
		genai.Text("--- IMAGEN 1 (ANTERIOR) ---"),
		genai.ImageData("jpeg", oldImageBytes),
		genai.Text("--- IMAGEN 2 (ACTUAL) ---"),
		genai.ImageData("jpeg", newImageBytes),
		genai.Text("Analiza la evolución entre la Imagen 1 y la Imagen 2."),
	}

	resp, err := model.GenerateContent(ctx, prompt...)
	if err != nil {
		return "", err
	}

	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		if txt, ok := resp.Candidates[0].Content.Parts[0].(genai.Text); ok {
			return string(txt), nil
		}
	}
	return "", errors.New("respuesta nula de IA")
}
