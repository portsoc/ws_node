var http = require('http');
var url = require('url');
var server = http.createServer(
    function (request, response) {
        var parsedUrl = url.parse(request.url, true);
        response.setHeader("Content-Type", "text/plain");
        response.end(
          'Hello ' + parsedUrl.query.fname +
          ' ' + parsedUrl.query.lname + '!\n');
    }
);
server.listen(8080);
// then go to http://localhost:8080/?lname=Solo&fname=Han
