/*function aritmeticaSumar(a,b){
    return a+b;
}
function aritmeticaRestar(a,b){
    return a-b;
}
function aritmeticaMultiplicar(a,b){
    return a*b;
}
function aritmeticaDividir(a,b){
    return a/b;
}

function operatoria(a, b, operacion){
    return operacion(a, b);
}

function operacionAritmetica( operacion ){

    return function(a,b){
        //console.log("salida de operacion --->",operacion);
        //console.log("Salida de a+b --->",a,b);
        return operatoria(a,b, operacion);
    }
}

let sumarNumeros = operacionAritmetica( aritmeticaSumar )
let restarNumeros = operacionAritmetica( aritmeticaRestar )
let multiplicarNumeros = operacionAritmetica( aritmeticaMultiplicar )
let dividirNumeros = operacionAritmetica( aritmeticaDividir )

console.log(sumarNumeros(2,3));
console.log(restarNumeros(2,3));
console.log(multiplicarNumeros(2,3));
console.log(dividirNumeros(2,3));
*/

let calcular = document.querySelector('#calcular');
let resultado = calcular.querySelector('#resultado');

calcular.addEventListener('click',calculadora);

function calculadora(){
    event.preventDefault();
    console.log('salida del front')
    let num1 = parseInt(document.querySelector('#num1').value);
    let num2 = parseInt(document.querySelector('#num2').value);
    let operador = document.querySelector('#operador').value;

    if (num1 && num2) {
        if(operador == 'sumar') {
            resultado.innerHTML = `${operador} es igual a ${operacion(num1, num2, sumar)}`
        }else{
            resultado.innerHTML = `${operador} es igual a ${operacion(num1, num2, restar)}`
        }
    }else{
        alert("Ingrese valores numéricos");
    }
}

function operacion(num1, num2, opera) {
    return opera(num1,num2);
}

function restar(num1, num2){
    return num1-num2;
}

function sumar(num1, num2){
    return num1+num2;
}