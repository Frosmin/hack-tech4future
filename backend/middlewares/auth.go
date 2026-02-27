package middlewares

import (
	"net/http"
	"strings"

	routes "github.com/Frosmin/backend/routes/auth"
	"github.com/gin-gonic/gin"
)

// AuthMiddleware verifica si el token JWT es válido
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token no proporcionado"})
			return
		}

		// El formato es generalmente "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "formato de token inválido"})
			return
		}

		tokenString := tokenParts[1]
		claims, err := routes.ValidateJWT(tokenString)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token inválido: " + err.Error()})
			return
		}

		// Agregar información del usuario al contexto
		c.Set("userID", claims.UserID)
		c.Set("email", claims.Email)
		c.Set("role", claims.Role)

		c.Next()
	}
}
