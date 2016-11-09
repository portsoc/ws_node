var fs = require('fs');

var path = "./worksheet/utility.js";

/**
 * Create a file `utility.js` within
 * the worksheet folder.
 */
test(
  "Create a file `utility.js`",
  function () {
    try {
        fs.accessSync(path, fs.F_OK);
        ok(true, "utility.js created");
    } catch (e) {
        ok(false, "utility.js is missing - please create it");
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
    var util = require(path);
    var msg = util.add(4,3);
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
    function(assert) {
      var util = require(path);
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

        assert.notOk(
            util.compare([4, 7, 11, 17], [4, 7, 11]),
            "different arrays that start the same, should not pass"
        );

        assert.notOk(
            util.compare([4, 7, 11, 17], [4, 7, 11, 3]),
            "different arrays that start the same, should not pass"
        );

        assert.notOk(
            util.compare([4, 7, 11, 17], [4, 17, 7, 11]),
            "two arrays in different order, should not pass"
        );

        assert.notOk(
            util.compare([], [4, 17, 7, 11]),
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
      var util = require(path);
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
