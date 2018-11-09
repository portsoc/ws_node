const http = require('http');
const server = http.createServer(
  (request, response) => {
    // respond to the request
    response.setHeader("Content-Type", "text/plain");
    response.end('Hello World at ' + request.url + '\n');
  }
);
server.listen(8080);  // node never stops, mostly waits
