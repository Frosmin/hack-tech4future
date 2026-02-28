package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const (
	RoleProveedor = "proveedor"
	RoleCliente   = "cliente"
	RoleAdmin     = "admin"
)

type User struct {
	gorm.Model
	Email     string `json:"email" gorm:"uniqueIndex;not null"`
	Password  string `json:"password,omitempty"`
	Role      string `json:"role" gorm:"not null"`
	AvatarURL string `json:"avatarUrl"`
}

type Client struct {
	gorm.Model
	UserID       uint   `json:"-"`
	User         User   `gorm:"foreignKey:UserID"`
	Name         string `json:"name" gorm:"not null"`
	ContactEmail string `json:"contactEmail" gorm:"unique;not null"`
	ContactPhone string `json:"contactPhone" gorm:"not null"`
	Age          int    `json:"age"`
}

// hash para password
func (u *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// login
func (u *User) CheckPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
}
