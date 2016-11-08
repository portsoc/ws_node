var net = require('net');

var port = 9999;

var responder = function (socket) {
	socket.write("Echo server\r\n");
	socket.pipe(socket);
};

var server = net.createServer(responder);

server.listen(port, "127.0.0.1");
console.log("Piped Echo Server listening on " + port);
