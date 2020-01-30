// import the express package
const express = require('express');

// create an express application
const app = express();

// Create a middleware object that serves
// static files from the 'public' folder
const publicFiles = express.static('public');

// attach the static middleware function to
// express at the / path.
app.use('/', publicFiles);

// start listening for connections on port 8080
app.listen(8080);
