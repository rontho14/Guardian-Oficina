let array = [];

for (i = 1; i <= 20; i++){
    array.push(i);
}

/* console.log(array) */

for (i = 0; i <= array.length; i++){
    if (array[i] % 2 == 0) {
        console.log(array[i])
    }
}