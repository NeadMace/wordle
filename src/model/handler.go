package model

import (
	"github.com/gin-gonic/gin"
)

type Handler struct {
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()
	router.Static("/css", "../src/templates/css")
	router.Static("/scripts", "../src/templates/scripts")
	router.Static("/img", "../src/templates/img")
	router.GET("/ws", h.SocketLogicPage)
	router.GET("/", h.HomePage)
	return router
}
