var net = require('net');

var port = 9999;

var responder = function (stream) {

	var handler = function (data) {
		console.log("Received: "+data);
		stream.write(data);
	};

    stream.addListener('data', handler);
	stream.write("\nEvented Echo Server\n");
};

var server = net.createServer(responder);

server.listen(port, "127.0.0.1");
console.log("Evented Echo Server listening on " + port);
