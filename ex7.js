function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let array = [];

for (i = 1; i <= 4; i++){
    array.push(getRandomInt(1, 15));
}

console.log(array);
console.log(Math.max(...array));

