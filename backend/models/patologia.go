package models

import "gorm.io/gorm"

type Patologia struct {
	gorm.Model
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Treatment   string      `json:"treatment"`
	Gravity     string      `json:"gravity"`
	Provability float64     `json:"provability"`
	IsMedical   bool        `json:"isMedical"`
	UserID      uint        `json:"userId"`
	Photos      []Photo     `json:"photos" gorm:"foreignKey:PatologiaID"`
	Compuestos  []Compuesto `json:"compuestos" gorm:"foreignKey:PatologiaID"`
}
