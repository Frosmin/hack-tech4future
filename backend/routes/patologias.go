package routes

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/Frosmin/backend/db"
	"github.com/Frosmin/backend/models"
	"github.com/Frosmin/backend/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

	// Leer bytes para enviarlos a la IA
	imageBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo leer la imagen"})
		return
	}

	mimeType := http.DetectContentType(imageBytes)
	format := strings.TrimPrefix(mimeType, "image/")

	// === NUEVO CÓDIGO: Subir la imagen a Cloudinary ===
	// 1. Regresar el puntero del archivo al inicio después de usar io.ReadAll
	if _, err := file.Seek(0, 0); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo resetear el buffer del archivo"})
		return
	}

	// 2. Usar tu servicio para subir la imagen generándole una URL segura
	uploadedUrl, err := services.UploadImage(file, "analisis_patologias")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al subir la imagen en Cloudinary"})
		return
	}
	// =================================================

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

	// 3. Crear el modelo Patologia, incluyendo sus compuestos y AHORA también su foto
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
				PhotoUrl:  uploadedUrl,
				DateTaken: time.Now(),
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

func GetPatologiaByID(c *gin.Context) {

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autorizado"})
		return
	}

	patologiaID := c.Param("id")

	var patologia models.Patologia

	resultado := db.DB.Preload("Compuestos").Preload("Photos").
		Where("id = ? AND user_id = ?", patologiaID, userID).
		First(&patologia)

	if resultado.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patología no encontrada o no tienes permisos para verla"})
		return
	}

	c.JSON(http.StatusOK, patologia)
}

func GetMisPatologias(c *gin.Context) {

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autorizado"})
		return
	}

	var patologias []models.Patologia
	db.DB.Preload("Photos", func(db *gorm.DB) *gorm.DB {
		return db.Order("created_at ASC")
	}).Where("user_id = ?", userID).Order("created_at DESC").Find(&patologias)

	type PatologiaResumen struct {
		ID      uint   `json:"id"`
		Title   string `json:"title"`
		Gravity string `json:"gravity"`
		Image   string `json:"Image"`
	}

	var resultado []PatologiaResumen
	for _, p := range patologias {
		fotoBase := ""
		if len(p.Photos) > 0 {
			fotoBase = p.Photos[0].PhotoUrl
		}

		resultado = append(resultado, PatologiaResumen{
			ID:      p.ID,
			Title:   p.Title,
			Gravity: p.Gravity,
			Image:   fotoBase,
		})
	}

	if resultado == nil {
		resultado = []PatologiaResumen{}
	}

	c.JSON(http.StatusOK, resultado)
}

func ComparePatologias(c *gin.Context) {
	// 1. Validar el usuario
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autorizado"})
		return
	}

	patologiaID := c.Param("id")

	// 2. Comprobar que la patología existe y obtener su descripción para darle contexto a la IA
	var patologia models.Patologia
	if err := db.DB.Where("id = ? AND user_id = ?", patologiaID, userID).First(&patologia).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patología no encontrada"})
		return
	}

	// 3. Buscar la última foto de esta patología (ordenando por fecha de creación descendentemente)
	var ultimaFoto models.Photo
	if err := db.DB.Where("patologia_id = ?", patologiaID).Order("created_at desc").First(&ultimaFoto).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No hay foto anterior registrada para comparar"})
		return
	}

	// 4. Descargar los bytes de la foto antigua desde Cloudinary/URL
	resp, err := http.Get(ultimaFoto.PhotoUrl)
	if err != nil || resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al descargar foto anterior"})
		return
	}
	defer resp.Body.Close()
	oldImageBytes, _ := io.ReadAll(resp.Body)

	// 5. Leer la foto NUEVA que envía el usuario en el request
	fileHeader, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Se requiere subir una 'image'"})
		return
	}
	file, _ := fileHeader.Open()
	defer file.Close()
	newImageBytes, _ := io.ReadAll(file)

	// Regresar el puntero a 0 para que UploadImage pueda subir la imagen posteriormente
	file.Seek(0, 0)

	// 6. Enviar ambas fotos a Gemini para comparación (Requieres crear este servicio)
	aiResponse, err := services.CompareEvolution(oldImageBytes, newImageBytes, patologia.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error comparando con IA: " + err.Error()})
		return
	}

	// 7. Decodificar la respuesta JSON de la IA
	var evolutionData struct {
		EvolutionStatus string `json:"evolutionStatus"`
		AnalysisSummary string `json:"analysisSummary"`
	}
	json.Unmarshal([]byte(aiResponse), &evolutionData)

	// 8. Subir la imagen actual a Cloudinary
	uploadedUrl, err := services.UploadImage(file, "evolucion_patologias")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al subir la nueva imagen a la nube"})
		return
	}

	// 9. Guardar la nueva foto y el análisis de la IA en la BD
	nuevaFoto := models.Photo{
		PhotoUrl:        uploadedUrl,
		DateTaken:       time.Now(),
		PatologiaID:     patologia.ID,
		EvolutionStatus: evolutionData.EvolutionStatus,
		AnalysisSummary: evolutionData.AnalysisSummary,
	}

	if err := db.DB.Create(&nuevaFoto).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar el nuevo registro base de datos"})
		return
	}

	// 10. Devolver LA NUEVA FOTO junto con la ANTERIOR para renderizar el comparador en React
	c.JSON(http.StatusOK, gin.H{
		"nuevaFoto":      nuevaFoto,
		"oldPhotoUrl":    ultimaFoto.PhotoUrl,
		"patologiaTitle": patologia.Title,
	})
}
