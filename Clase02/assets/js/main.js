let numero_entero = 44;
let cadena_de_texto = "hola";
let verdadero_o_falso = true;
let numero_como_string = "11";

console.log(typeof numero_como_string);
console.log("number " + (Number(numero_como_string)+2));

if(numero_entero == (Number(numero_como_string)+2)) {
    console.log("son iguales");
}else{
    console.log("no son iguales");
}

/*Estrictamente igual: === evalúa que además del valor coincida el tipo*/

/*Se usan los demás comparadores y operadores lógicos comunes*/

const usuario = "admin";
const clave = "a1p2l3i4"
user = prompt("Usuario: ");
password = prompt("Password: ");

if ((user == usuario)&&(password == clave)) {
    alert("Puede ingresar");
}else{
    alert("Usuario incorrecto");
}


