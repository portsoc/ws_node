var
	port = 9999,
	open_sockets = [],
	ws_svr = require('ws').Server,
	ws_config = {
		port: port
	},
	wss = new ws_svr(ws_config),
	ws_responder = function(ws) {

		open_sockets.push(ws);

		ws.on('message', function(message) {
			console.log('received: %s', message);

			for (var i = open_sockets.length - 1; i >= 0; i--) {
				open_sockets[i].send(message);
			}

		});

		ws.on('end', function(message) {
			console.log('end: %s', message);
			open_sockets.remove(ws);
		});

		ws.send('{"x":0,"y":0}');
	},

	ipaddr = require('os').networkInterfaces().en0[1].address;

wss.on('connection', ws_responder);
console.log("WS Listening on:", ipaddr + ":" + port)

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(".")).listen(8080);

console.log("Visit: http://"+ipaddr + ":" + 8080);
