function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let n = getRandomInt(0, 10);

let mult = (a, b) => a * b;

for (i = 1; i <= 10; i++){
    console.log(n + " x " + i + " = " + mult(n, i));
}
