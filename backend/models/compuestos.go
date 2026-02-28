package models

import "gorm.io/gorm"

type Compuesto struct {
	gorm.Model
	Name        string `json:"name"`
	PatologiaID uint   `json:"patologiaId"`
}
