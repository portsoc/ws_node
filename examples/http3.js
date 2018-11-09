const http = require('http');
const url = require('url');

const server = http.createServer(
  (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if (parsedUrl.pathname === '/hello') {
      response.setHeader("Content-Type", "text/plain");
      response.end('Hello!\n');
    } else {
      response.statusCode = 404;
      response.end('Not found!\n');
    }
  }
);
server.listen(8080);
// then go to http://localhost:8080/hello
// and http://localhost:8080/foo
