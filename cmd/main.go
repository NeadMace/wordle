package main

import (
	"log"
	s "server"
	h "src/model"

	"github.com/spf13/viper"
)

func main() {
	if err := initConfig(); err != nil {
		log.Fatal("Ошибка при чтении из конфига:%s", err.Error())
	}
	handlers := new(h.Handler)
	srv := new(s.Server)
	if err := srv.Run(viper.GetString("port"), handlers.InitRoutes()); err != nil {
		log.Fatal("Возникла ошибка при подключении к серверу:%s", err.Error())
	}
	//http.HandleFunc("/websocket", websocketHandler)
	//log.Fatal(http.ListenAndServe(":8080", nil))
}

func initConfig() error {
	viper.AddConfigPath("../src/config")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
