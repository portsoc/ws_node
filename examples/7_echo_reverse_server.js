var net = require('net');

var responder = function (stream) {

	var reverser = function (data) {
		var buf = new Buffer(data.length);
		for (var i = 0; i < data.length ; i++) {
			buf[i] = data[data.length-i-1];
		}
		console.log("Reversing:" + data);
	    stream.write(buf);
	    stream.write('\n');
	};

    stream.addListener('data', reverser);
	stream.write("\nReverse Echo Server\n");
};

var server = net.createServer(responder);

server.listen(9999, "127.0.0.1");

