package models

import (
	"time"

	"gorm.io/gorm"
)

type Photo struct {
	gorm.Model
	PhotoUrl    string    `json:"photoUrl" gorm:"not null"`
	DateTaken   time.Time `json:"dateTaken"`
	PatologiaID uint      `json:"patologiaId"`
}
