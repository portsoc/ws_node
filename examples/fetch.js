const fetch = require("node-fetch");

async function main() {
  const response = await fetch("http://127.0.0.1:8080");
  console.log(await response.text());
}

main();
