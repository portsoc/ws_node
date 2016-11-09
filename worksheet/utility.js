
function add(a,b) {
  return a+b;
}

module.exports.add = add;


exports.compare =  function(a,b) {
  if (a.length == b.length) {
    for (var i=0; i<a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }
  return false;
};


exports.reverse = function(srcArray) {
  var reversed = new Array(srcArray.length);
  for (var i = 0; i<srcArray.length; i++) {
    reversed[srcArray.length-i-1] = srcArray[i];
  }
  return reversed;
};


exports.largest = function(numbers) {
  var soFar = 0;
  for (var i=0; i<numbers.length; i++) {
    if (numbers[i] > soFar) {
      soFar = numbers[i];
    }
  }
  return soFar;
};
