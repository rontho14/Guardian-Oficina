function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let idade = getRandomInt(10, 30);

console.log("Idade: " + idade);

if (idade >= 18){
    console.log("Pode jogar o CTF!")
} else {
    console.log("espere mais um pouco...")
}
