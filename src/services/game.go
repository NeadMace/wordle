package services

import (
	"encoding/json"
	"fmt"
	"log"
)

func GameLogic(message []byte) []byte {
	map_message := make(map[string]interface{})
	err := json.Unmarshal(message, map_message)
	if err != nil {
		log.Fatal("Ошибка при расспаковке запроса из json в map:%s", err.Error())
	}
	fmt.Print(map_message)
	//arrStr := strings.Split(str_message, ":")
	return message
}
