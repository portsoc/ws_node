const person1 = { name: "Rich", age: 0 };
const person2 = { name: "Matt", age: 18 };

function becomeOlder(whom) {
  whom.age += 1;
}

function showAge(whom) {
  console.log(`${whom.name} is ${whom.age}`);
}

setInterval(becomeOlder, 2000, person1);
setInterval(showAge, 1000, person1);
setInterval(showAge, 500, person2);
