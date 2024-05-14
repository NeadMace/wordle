package model

import (
	"html/template"
	"log"

	"github.com/gin-gonic/gin"
)

func (h *Handler) HomePage(c *gin.Context) {
	tmpl, err := template.ParseFiles("../src/templates/game_page.html")
	if err != nil {
		log.Fatal("Ошибка при загрузке html файла в endPoint \"/\": %s", err.Error())
	}
	tmpl.Execute(c.Writer, "ws://localhost:8000/ws")
}
