var say, exec;

say = function (msg) {
  console.log(msg);
}

exec = function (fn, msg) {
	fn(msg);
}

exec(say, "passing function references is useful");
