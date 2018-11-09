const http = require('http');
const url = require('url');
const server = http.createServer(
  (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    response.setHeader("Content-Type", "text/plain");
    response.end(`Hello ${parsedUrl.query.fname} ${parsedUrl.query.lname}!\n`);
  }
);
server.listen(8080);
// then go to http://localhost:8080/?lname=Solo&fname=Han
