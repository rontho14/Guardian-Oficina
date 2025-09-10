let dados = '{"user":"alice","flag":"GUARDIAN{JS0N_L3AK3D}"}';

let jsObject = JSON.parse(dados);

console.log(jsObject.flag);

