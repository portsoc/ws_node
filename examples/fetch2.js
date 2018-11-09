// this is like fetch.js but uses a promise.then() syntax

const fetch = require("node-fetch");

function main() {
  fetch("http://127.0.0.1:8080")
    .then(response => response.text())
    .then(console.log);
}

main();
