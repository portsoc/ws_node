var http = require('http');
var url = require('url');
var server = http.createServer(
    function (request, response) {
        var parsedUrl = url.parse(request.url, true);
		    if (parsedUrl.pathname == '/add') {
            response.setHeader("Content-Type", "text/plain");
            response.end((+parsedUrl.query.a + +parsedUrl.query.b).toString());
        } else {
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/plain");
            response.end('Not found!\n');
        }
    }
);
server.listen(8080);
// then go to http://localhost:8080/add?a=3&b=6.3
