let http = require('http');
let url = require('url');
let server = http.createServer(
    function (request, response) {
        let parsedUrl = url.parse(request.url, true);
        response.setHeader("Content-Type", "text/plain");
        response.end(
          'Hello ' + parsedUrl.query.fname +
          ' ' + parsedUrl.query.lname + '!\n');
    }
);
server.listen(8080);
// then go to http://localhost:8080/?lname=Solo&fname=Han
