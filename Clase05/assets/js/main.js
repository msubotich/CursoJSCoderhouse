//instanciar un objeto

let cuadrado = new Object();
cuadrado.ancho = 10;
cuadrado.alto = 10;
console.log(cuadrado);

//crear directamente
let cuadrado1 = {
    ancho: 10,
    alto: 10,
}
console.log(cuadrado1);

//notación de punto
console.log("ancho: " + cuadrado1.ancho);
console.log("alto: " + cuadrado1.alto);
console.log("El área es: " + cuadrado1.alto*cuadrado1.ancho);
//notación de corchete (es útil cuando las propiedades tienen nombres con caracteres especiales)
console.log("el alto es: " + cuadrado["alto"]);

//asignar (redefinir)
cuadrado["alto"] = 3;
cuadrado.ancho = 15;
console.log("El área es: " + cuadrado.alto*cuadrado.ancho);

//función constructora (deprecado)

function Estudiante(nombre){
    this.nombre = nombre;
}

let manolo = new Estudiante("Manuel Olarticoechea");
let pancho = new Estudiante("Francisco Juarez");

console.log(manolo);
console.log(pancho);

//se pueden crear métodos una vez instanciada

manolo.saludar = function(){
    console.log(`Hola, soy ${this.nombre}`);
}

manolo.saludar();
console.log(manolo);

//Objeto literal con metodos
const humano = {
    nombre : 'Pablo',
    saludar : function(){console.log(`Hola, soy ${this.nombre}`);}
}

console.log(humano);
humano.saludar();

//Forma más utilizada (ANTES DE LAS CLASES)

function Estudiantes(nombre, edad, direccion){
    this.nombre = nombre;
    this.edad = edad;
    this.direccion = direccion;

    //metodo
    this.saludar = function(){
        console.log(`Hola, soy ${this.nombre}, tengo ${this.edad} años y vivo en ${this.direccion}`);
    }
}

let ana = new Estudiantes("Ana Fernandez",25,"las palomas 14");
let juan = new Estudiantes("Juan Fernandez",35,"las palomas 14");

console.log(ana);
console.log(juan);
ana.saludar();
juan.saludar();
