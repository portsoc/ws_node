// declare use of the http library
var http = require('http');

// create a callback function that responds to page requests
var responder = function (request, response) {
	response.setHeader("Content-Type", "text/plain");
	response.end('Hello World\n');
}

// create an instance of an http server
var server = http.createServer(responder);

// start the server on a specific port
var port = 8080;
server.listen(port);
console.log("listening on: "+port);
