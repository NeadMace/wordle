document.addEventListener('DOMContentLoaded', function() {
    var ws;

    function connect() {
        ws = new WebSocket('ws://localhost:8000/game');

        ws.onopen = function() {
            console.log('Соединение установлено');
        };

        ws.onmessage = function(event) {
            console.log('Получено сообщение: ' + event.data);
        };

        ws.onclose = function() {
            console.log('Соединение закрыто');
        };

        ws.onerror = function(error) {
            console.log('Ошибка: ' + error);
        };
    }

    document.getElementById('sendButton').addEventListener('click', function() {
        //alert("Hi")
        window.location.href = "ws://localhost:8000/game"
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.log('WebSocket не подключен. Подключаюсь...');
            connect();
        }
        ws.send('Привет, сервер!');
        console.log('Сообщение отправлено: Привет, сервер!');
    });
});