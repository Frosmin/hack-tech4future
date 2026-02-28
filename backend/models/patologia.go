package models

import "gorm.io/gorm"

type Patologia struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Treatment   string  `json:"treatment"`
	UserID      uint    `json:"userId"`
	Photos      []Photo `json:"photos" gorm:"foreignKey:PatologiaID"`
}
