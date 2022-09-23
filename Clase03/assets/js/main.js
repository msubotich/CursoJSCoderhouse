/*let numero = 100;
let valor = 0;
let valor2 = 0;
let dato = 200;

for (let i = 0; i <= numero; i+=2) {
    console.log(i);
}

while ( valor <= numero ) {
    console.log(valor);
    valor++;
}

do {
    console.log(valor2);
    valor2++;
} while ( valor2 <= numero ) 

switch ( dato ) {
    case 100:
        console.log(dato);
        break;
    case 200:
        console.log(dato-1);
        break;
    default:
        console.log(dato*10);
        break;
}

do{
numero = parseInt(prompt("Ingrese un número",0));
}while ( isNaN(numero) );

if ( numero%2 == 0 ) {
    console.log("Es par");
}else{
    console.log("Es impar");
}

for (let i = 0; i <=9; i++) {
    if (numero%i ==0) console.log("El número es divisible por " + i);
}

*/

/*

    Programa que le permitan realizar la multiplicacion de un  numero y su factorial.

    Para ello, en una primera etapa, te han pedido un programa que al ingresar un número,

    obtenga las tablas de multiplicar desde el 1 hasta el número ingresado. Además, debe

    mostrar el factorial para los mismos números. El resultado debe ser mostrado por la

    consola del navegador, por ejemplo, si ingresan el número 3 en la consola deberían obtener

    el siguiente resultado:

    1 x 3 = 3

    2 x 3 = 6

    3 x 3 = 9

    Factorial de 1 es: 1

    Factorial de 2 es: 2

    Factorial de 3 es: 6

    Se debe validar que el numero este entre 1 y 20

*/

let numero = 0;
let mensaje;
let num = parseInt(prompt("Ingrese un número entre 1 y 20"));

function verificar(numero){
    num = numero;
    if (!isNaN(num)){
        if(num >=1 && num <=20){
            mensaje = alert("El número está dentro del rango");
        }else{
            while(num <1 || num >20){
                mensaje = alert("El número está fuera del rango");
                num = parseInt(prompt("Ingrese un número entre 1 y 20"));
            }
        }
            
    }else{
        mensaje = alert("Debe ingresar solo un número");
        num = parseInt(prompt("Ingrese un número entre 1 y 20"));
        verificar(num);
    }
}

function operatoria(num){
    for(let i = 1; i<= num;i++){
        let multiplicacion = i*num;
        console.log(`$(i) x $(num) = $(multiplicacion)` );
    }
}
verificar(num);

