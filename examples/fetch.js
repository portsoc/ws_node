const fetch = require("node-fetch");

fetch("http://127.0.0.1")
  .then(response => response.text())
  .then(console.log);
