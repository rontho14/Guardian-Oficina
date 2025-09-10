function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let n1 = getRandomInt(0, 10);
let n2 = getRandomInt(0, 10);

let soma = (a, b) => a + b;

console.log("Soma de " + n1 + " + " + n2 + " = " + soma(n1, n2) );