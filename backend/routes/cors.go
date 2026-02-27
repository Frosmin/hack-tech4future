package routes

import (
	"github.com/Frosmin/backend/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

	r.Use(cors.New(config))

	api := r.Group("/public")

	//aqui tiene que estar en /public
	api.POST("/login", LoginHandler)
	api.POST("/client", PostClientHandler)

	// rutas protegidas
	protected := r.Group("/protected")
	protected.Use(middlewares.AuthMiddleware())
	{

	}
	return r
}
