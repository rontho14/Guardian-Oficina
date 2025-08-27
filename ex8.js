function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let n = getRandomInt(1, 10)

for (i = 0; i <= n; i++){
    console.log(n-i)
}

