const person = {
  name: "Rich",
  age: 0
};

function becomeOlder(whom) {
  whom.age += 1;
}

function describePerson(whom) {
  console.log(`${whom.name} is ${whom.age}`);
}

setInterval(becomeOlder, 1000, person);
setInterval(describePerson, 1000, person);
