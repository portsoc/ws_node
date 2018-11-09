const counters = {
  doh:0,
  mi:0,
  so:0
};

function doh() {
  counters.doh++;
  console.log("do");
}

function mi() {
  counters.mi++;
  console.log("   mi");
}

function so() {
  counters.so++;
  console.log("      so");
}

function summary() {
  console.log(counters);
}

exports.doh = doh;
exports.mi = mi;
exports.so = so;
exports.summary = summary;
