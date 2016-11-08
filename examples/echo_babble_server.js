var net = require('net');

var port = 9999;

var streams = [];

var responder = function (stream) {

	streams.push(stream);

	var handler = function (data) {
		for (var i = streams.length - 1; i >= 0; i--) {
			streams[i].write(data);
		}
	};

    stream.addListener('data', handler);
	stream.write("\nEcho Babble Server\n");
};

var server = net.createServer(responder);

server.listen(port, "127.0.0.1");
console.log("Echo Babble Server listening on " + port);
