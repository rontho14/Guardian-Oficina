const str = "FLAG{aprendendo_js}";

console.log(str.toUpperCase());

if (str.includes("js")){
    console.log('a flag contem "js" ');
}

const aprendendo = str.match(/^FLAG\{(.*?)_js\}$/);

if (aprendendo) {
    console.log(aprendendo[1]);
}





