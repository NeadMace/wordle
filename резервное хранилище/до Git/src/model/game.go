package model

import (
	"fmt"
	"log"

	svc "src/services"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func (h *Handler) SocketLogicPage(c *gin.Context) {
	conn, err := Upgrader.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		fmt.Println("Зашел в прослушку")
		// read message from client
		_, message, err := conn.ReadMessage()

		if err != nil {
			log.Println(err)
			break
		}
		go svc.GameLogic(message)
		// show message
		log.Printf("Received message: %s", message)
		responce := []byte("Okey")
		//send message to client
		err = conn.WriteMessage(websocket.TextMessage, responce)
		if err != nil {
			log.Println(err)
			break
		}

	}
}
