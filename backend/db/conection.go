package db

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	sslmode := os.Getenv("DB_SSLMODE")

	DSN := "host=" + host +
		" user=" + user +
		" password=" + password +
		" dbname=" + dbname +
		" port=" + port +
		" sslmode=" + sslmode

	// var err error
	DB, err = gorm.Open(postgres.New(postgres.Config{
        DSN:                  DSN,
        PreferSimpleProtocol: true, //desctivar cuando este en producion sirve para que no use la cache cuando esta con air
    }), &gorm.Config{})
    
	
	if err != nil {
		panic("failed to connect database: " + err.Error())
	} else {
		println("Connected to database")
	}
}
