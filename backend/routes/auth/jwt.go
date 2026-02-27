package routes

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/Frosmin/backend/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

var jwtKey []byte

// Si la variable de entorno no está configurada, usar una clave por defecto (solo para desarrollo) si se reincia el backend esta llave cambia
func init() {

	godotenv.Load()
	secret := os.Getenv("JWT_SECRET")

	if secret == "" {
		fmt.Println("usando clave eleatoria")
		fmt.Println(secret)
		jwtKey = []byte("clave_secreta_temporal_cambiar_en_produccion")
	} else {
		fmt.Println("usando clave de servidor")
		fmt.Println(secret) // imprime clave del servidor borrar luego :D
		jwtKey = []byte(secret)
	}
}

// Claims personalizado para el token JWT
type Claims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// GenerateJWT genera un nuevo token JWT para un usuario
func GenerateJWT(user models.User) (string, error) {
	// Establecer expiración del token (por ejemplo, 24 horas)
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &Claims{
		UserID: user.ID,
		Email:  user.Email,
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	return tokenString, err
}

// ValidateJWT valida un token JWT y retorna los claims si es válido
func ValidateJWT(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("token inválido")
	}

	return claims, nil
}
