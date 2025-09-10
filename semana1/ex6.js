function getRandomBoolean() {
      return Math.random() < 0.5;
    }

const usuario = {
    nome: "Jonas",
    idade: "21",
    admin: getRandomBoolean(),
}

if (usuario.admin == true){
    console.log("Bem vindo administrador!");
} else {
    console.log("Bem vindo, usuário comum.")
}
