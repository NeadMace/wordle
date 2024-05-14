package socket

import (
	"log"
	"net/http"
	soc "src/model"

	"github.com/gorilla/websocket"
)

func WebsocketHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := soc.Upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		// read message from client
		_, message, err := conn.ReadMessage()

		if err != nil {
			log.Println(err)
			break
		}
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
