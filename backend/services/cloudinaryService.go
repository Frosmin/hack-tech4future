package services

import (
	"context"
	"errors"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

// UploadImage sube un archivo a Cloudinary en la carpeta especificada.
// file: Puede ser un io.Reader (resultante de fileHeader.Open()) o un path string.
// folder: Nombre de la carpeta en Cloudinary (ej: "proveedores_avatars", "productos").
func UploadImage(file interface{}, folder string) (string, error) {
	// Verificar que la variable de entorno exista
	cloudinaryURL := os.Getenv("CLOUDINARY_URL")
	if cloudinaryURL == "" {
		return "", errors.New("CLOUDINARY_URL no está configurada en el entorno")
	}

	// Crear una instancia del cliente de Cloudinary
	cld, err := cloudinary.NewFromURL(cloudinaryURL)
	if err != nil {
		return "", err
	}

	var ctx = context.Background()

	// Subir archivo
	uploadResult, err := cld.Upload.Upload(ctx, file, uploader.UploadParams{
		Folder: folder,
	})

	if err != nil {
		return "", err
	}

	// Retornar la URL segura
	return uploadResult.SecureURL, nil
}
