let fs = require('fs');
let http = require('http');

let dir = "./worksheet/";

let pathUtil = "utility.js";
let pathWeb = "webserver.js";

/**
 * Create a file `utility.js` within
 * the worksheet folder.
 */
test(
  "Create a file `" + pathUtil + "`",
  function () {
    try {
      fs.accessSync(dir+pathUtil, fs.F_OK);
      ok(true, pathUtil + " created");
    } catch (e) {
      ok(false, pathUtil + " is missing - please create it");
    }
});




/**
 * Reuse the code from the module example (i.e. func.js in
 * the examples folder) and paste it into `utility.js` so that
 * it becomes a javascript module.
 */
test(
  "Borrow the add function.",
  function () {
    let util = require(dir+pathUtil);
    let msg = util.add(4,3);
    equal(util.add(4,3), 7, "4+3=7");
    equal(util.add(0,0), 0, "0+0=0");
    equal(util.add(1000,1000), 2000, "1000+1000=2000");
});



/**
 * Create a function called compare that accepts two arrays of numbers
 * and compares the contents.  It should return true if the arrays are
 * identical and false otherwise.
 *
 * i.e. you've done this before, so you're now reusing your own code
 * and turning it into a module.
 */
test(
  "Compare Arrays",
    function() {
      let util = require(dir+pathUtil);
        ok(
          typeof util.compare === "function",
          "Create a function called compare."
        );

        ok(
          util.compare([1], [1]),
          "two arrays with 1, should pass"
        );

        ok(
          util.compare([1, 2, 3], [1, 2, 3]),
          "two identical arrays, should pass"
        );

        ok(
          util.compare([4, 7, 11, 17], [4, 7, 11, 17]),
          "two arrays, four idential elements each, should pass"
        );

        ok(
          !util.compare([4, 7, 11, 17], [4, 7, 11]),
          "different arrays that start the same, should not pass"
        );

        ok(
          !util.compare([4, 7, 11, 17], [4, 7, 11, 3]),
          "different arrays that start the same, should not pass"
        );

        ok(
          !util.compare([4, 7, 11, 17], [4, 17, 7, 11]),
          "two arrays in different order, should not pass"
        );

        ok(
          !util.compare([], [4, 17, 7, 11]),
          "two arrays, one empty, should not pass"
        );
    }
);


/**
 * Create a function called largest that accepts an array
 * of numbers and returns the largest number.
 */
test("Largest",
    function() {
      let util = require(dir+pathUtil);
        ok(
          typeof util.largest === "function",
          "Create a function called largest."
        );
        ok( util.largest([0,1,2]) == 2, "2 is the largest of 0,2 & 2" );
        ok( util.largest([1,1,3]) == 3, "2 is the largest of 1,1 & 3" );
        ok( util.largest([2,2,2]) == 2, "2 is the largest of 2, 2 & 2");
        ok( util.largest([1,2,3,4,5,6,7,8,3,-5]) == 8, "8 is th largest" );
        ok( util.largest([1]) == 1, "single element array works") ;
    }
);



/**
 * Create a file `webserver.js` within the worksheet folder.
 *
 * Reuse the code from the http.js example to implement
 * a web server that can listen on port 8080.
 *
 * Adapt the code in http3 so that your server responds
 * to requests `/add`.
 *
 * Adapt the code in http2 so that your server accepts two parameters,
 * `a` and `b` and returns the result of adding them together as a
 * plain text response.
 * e.g. '/add?a=2&b=3.4' should return 5.4
 * e.g. '/add?a=100&b=9' should return 109
 * e.g. '/add?b=300&a=200' should return 500
 *
 * If a path other than /add is requested a 404 error should be returned.
 *
 * Running the tests starts your web server, but if you want to try it in
 * your browser, you need to start the webserver explicitly, with the command
 * `node worksheet/webserver`
 */
test(
  "Create a file `" + pathWeb + "`",
  function () {
    expect(2);
    try {
      fs.accessSync(dir+pathWeb, fs.F_OK);
      ok(true, pathWeb + " created");

    } catch (e) {
      ok(false, pathWeb + " is missing - please create it");
    }

    // check that before we start the server, no other server is
    // taking the port 8080
    let options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/',
    };

    stop();

    let req = http.request(options, function(response) {
      ok(false, 'before we start the server, the request should fail - make sure you are not running anything on port 8080');
      start();
    });
    req.on('error', function (e) {
      equal(e.errno, 'ECONNREFUSED', 'if this assertion fails, make sure you are not running anything else on port 8080');
      start();
    });
    req.end();
});


test(
  "Add two numbers for the path /add",
  function () {
    require(dir+pathWeb);
    let options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/add?a=2&b=3.4',
    };

    stop();

    let req = http.request(options, function(response) {
      equal(response.statusCode, 200, 'successful /add should return status code 200');
      let str = '';
      response.on('data', function(chunk) { str += chunk; });
      response.on('end', function() {
        equal(str.trim(), '5.4', 'calling /add?a=2&b=3.4 returns 5.4');
        start();
      });
    });
    req.on('error', function (e) {
      ok(false);
      start();
    });
    req.end();
  }
);



test(
  "Return a 404 for all non-existent paths",
  function () {
    require(dir+pathWeb);
    let options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/notthere',
    };

    expect(1);
    stop();

    let req = http.request(options, function(response) {
      equal(response.statusCode, 404, 'server should return 404 for /notthere');
      start();
    });
    req.on('error', function (e) {
      ok(false);
      start();
    });
    req.end();
  }
);
