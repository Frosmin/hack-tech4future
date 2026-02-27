package main

import (
	"log"

	"github.com/Frosmin/backend/db"
	"github.com/Frosmin/backend/routes"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		log.Println("Archivo .env no encontrado, usando variables de entorno del sistema")
	}

	db.Connect()

	// borar las tablas
	// err := db.DB.Migrator().DropTable(
	// 	models.User{},
	// 	models.Client{},
	// 	models.Patologia{},
	// 	models.Photo{},
	// )
	// if err != nil {
	// 	log.Println("Error al borrar tablas  ", err)
	// }
	// log.Println("Tablas eliminadas correctamente")
	// // migarciones de las tablas
	// err = db.DB.AutoMigrate(
	// 	models.User{},
	// 	models.Client{},
	// 	models.Patologia{},
	// 	models.Photo{},
	// )
	// if err != nil {
	// 	log.Fatal("error en las migraciones ", err)
	// }

	r := routes.SetupRouter()

	log.Println("Servidor escuchando en :8080")
	log.Fatal(r.Run(":8080"))
}
