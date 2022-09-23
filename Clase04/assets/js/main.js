function generaDiv(colorete = prompt("Ingresa un número de seis cifras Hexadecimal")){
    console.log("Calculadora");
    let cantidad = parseInt(prompt("ingrese cantidad de divs"))
    for(i = 1; i <= cantidad; i++){
    document.write('<div style="margin:10px;display:inline-block;width:500px;background-color:' +colorete +'"><h1>Div ',i,' generado por JS</h1></div>');
    }
    document.write('<button type="button" onclick="generaDiv()">Click ME</button>');
    document.write('<a href="../index.html">Volver</a>');
}

const retornarnum = () => {  //otra forma de declarar una función
    return 3
}

console.log(retornarnum());

// En ECMA5, funcion anonima

    var funciones = function () {
        console.log("cuerpo")
    }

// en ECMA6, arrow function

    const arrow = (parametro1) => {
        console.log(parametro1);
    }

// si el cuerpo es de una sola linea se puede hacer

    const linea = (parametro2) => console.log(parametro2); // se eliminan las llaves


// si lleva un solo parametro se puede hacer:
    const minimo = parametro3=> parametro3+2;

linea(1);
arrow(2);

let resultado = minimo(10); // en todos los casos, las arrow dan el return implícito
console.log (resultado);

