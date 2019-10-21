let fs = require('fs');
let http = require('http');

let dir = "./worksheet/";

let pathUtil = "utility.js";
let pathWeb = "webserver.js";

/**
 * Create a file `utility.js` within
 * the worksheet folder.
 */
QUnit.test(
  "Create a file `" + pathUtil + "`",
  function (assert) {
    try {
      fs.accessSync(dir+pathUtil, fs.F_OK);
      assert.ok(true, pathUtil + " created");
    } catch (e) {
      assert.ok(false, pathUtil + " is missing - please create it");
    }
});




/**
 * Reuse the code from the module example (i.e. func.js in
 * the examples folder) and paste it into `utility.js` so that
 * it becomes a javascript module.
 */
QUnit.test(
  "Borrow the add function.",
  function (assert) {
    let util = require(dir+pathUtil);
    let msg = util.add(4,3);
    assert.equal(util.add(4,3), 7, "4+3=7");
    assert.equal(util.add(0,0), 0, "0+0=0");
    assert.equal(util.add(1000,1000), 2000, "1000+1000=2000");
});



/**
 * Create a function called compare that accepts two arrays of numbers
 * and compares the contents.  It should return true if the arrays are
 * identical and false otherwise.
 *
 * i.e. you've done this before, so you're now reusing your own code
 * and turning it into a module.
 */
QUnit.test(
  "Compare Arrays",
    function(assert) {
      let util = require(dir+pathUtil);
        assert.ok(
          typeof util.compare === "function",
          "Create a function called compare."
        );

        assert.ok(
          util.compare([1], [1]),
          "two arrays with 1, should pass"
        );

        assert.ok(
          util.compare([1, 2, 3], [1, 2, 3]),
          "two identical arrays, should pass"
        );

        assert.ok(
          util.compare([4, 7, 11, 17], [4, 7, 11, 17]),
          "two arrays, four idential elements each, should pass"
        );

        assert.ok(
          !util.compare([4, 7, 11, 17], [4, 7, 11]),
          "different arrays that start the same, should not pass"
        );

        assert.ok(
          !util.compare([4, 7, 11, 17], [4, 7, 11, 3]),
          "different arrays that start the same, should not pass"
        );

        assert.ok(
          !util.compare([4, 7, 11, 17], [4, 17, 7, 11]),
          "two arrays in different order, should not pass"
        );

        assert.ok(
          !util.compare([], [4, 17, 7, 11]),
          "two arrays, one empty, should not pass"
        );
    }
);


/**
 * Create a function called largest that accepts an array
 * of numbers and returns the largest number.
 */
QUnit.test("Largest",
    function(assert) {
      let util = require(dir+pathUtil);
        assert.ok(
          typeof util.largest === "function",
          "Create a function called largest."
        );
        assert.ok( util.largest([0,1,2]) == 2, "2 is the largest of 0,2 & 2" );
        assert.ok( util.largest([1,1,3]) == 3, "2 is the largest of 1,1 & 3" );
        assert.ok( util.largest([2,2,2]) == 2, "2 is the largest of 2, 2 & 2");
        assert.ok( util.largest([1,2,3,4,5,6,7,8,3,-5]) == 8, "8 is th largest" );
        assert.ok( util.largest([1]) == 1, "single element array works") ;
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
 *
 * Make sure to export the result of http.createServer,
 * e.g. if you have `const server = http.createServer(...)`
 * then use `module.exports = server;`
 */
QUnit.test(
  "Create a file `" + pathWeb + "`",
  function (assert) {
    assert.expect(2);
    try {
      fs.accessSync(dir+pathWeb, fs.F_OK);
      assert.ok(true, pathWeb + " created");

    } catch (e) {
      assert.ok(false, pathWeb + " is missing - please create it");
    }

    // check that before we start the server, no other server is
    // taking the port 8080
    let options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/',
    };

    const done = assert.async();

    let req = http.request(options, function(response) {
      assert.ok(false, 'before we start the server, the request should fail - make sure you are not running anything on port 8080');
      done();
    });
    req.on('error', function (e) {
      assert.equal(e.errno, 'ECONNREFUSED', 'if this assertion fails, make sure you are not running anything else on port 8080');
      done();
    });
    req.end();
});


QUnit.test(
  "Add two numbers for the path /add",
  function (assert) {
    require(dir+pathWeb);
    let options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/add?a=2&b=3.4',
    };

    const done = assert.async();

    let req = http.request(options, function(response) {
      assert.equal(response.statusCode, 200, 'successful /add should return status code 200');
      let str = '';
      response.on('data', function(chunk) { str += chunk; });
      response.on('end', function() {
        assert.equal(str.trim(), '5.4', 'calling /add?a=2&b=3.4 returns 5.4');
        done();
      });
    });
    req.on('error', function (e) {
      assert.ok(false);
      done();
    });
    req.end();
  }
);



QUnit.test(
  "Return a 404 for all non-existent paths",
  function (assert) {
    const server = require(dir+pathWeb);
    let options = {
      host: 'localhost',
      port: '8080',
      method: 'GET',
      path: '/notthere',
    };

    assert.expect(1);
    const done = assert.async();

    let req = http.request(options, function(response) {
      assert.equal(response.statusCode, 404, 'server should return 404 for /notthere');
      done();
      if (server.close) {
        server.close();
      } else {
        console.log(`If this does not quit, ${pathWeb} probably needs to export the server.\nPress ctrl-c to end the test.`);
      }
    });
    req.on('error', function (e) {
      assert.ok(false);
      done();
      if (server.close) {
        server.close();
      } else {
        console.log(`If this does not quit, ${pathWeb} probably needs to export the server.\nPress ctrl-c to end the test.`);
      }
    });
    req.end();
  }
);
