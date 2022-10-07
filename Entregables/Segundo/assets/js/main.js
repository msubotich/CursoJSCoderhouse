//función que solicita datos al usuario para cargarlos en la tabla
document.getElementById('costoxgramo').value = "2.5";
document.getElementById('costoxhora').value = "150";

const entradas = [ //archivo simulado 
    {indice: 1, cliente:"Manuel Fernandez", modelo:"Batman chico",material:98.4,pintado:true,tiempo:7},
    {indice: 2, cliente:"Ana Suarez", modelo:"Busto Skyrim",material:103,pintado:true,tiempo:9},
    {indice: 3, cliente:"Pelado", modelo:"kit SW-MF",material:45,pintado:false,tiempo:1.5},
    {indice: 4, cliente:"Julian Molteni", modelo:"Mate Groot",material:75.6,pintado:true,tiempo:4.1},
    {indice: 5, cliente:"Lucía (amiga de fer)", modelo:"Miniatura Warhammer",material:19,pintado:false,tiempo:2} 
];
const archivoImpresiones = [];

class Impresion{
    //propiedades
    constructor(indice,cliente,modelo,material,pintado,tiempo){
        this.indice = indice;
        this.cliente = cliente;
        this.modelo = modelo;
        this.material = material;
        this.pintado = pintado;
        this.tiempo = tiempo;
    }

    //metodos
    calcularValores(){ //retorna un arreglo con el valor total y el margen de ganancia.

        let valores = []; //arreglo para el output de la función
        let costo,ganancia,total,margen = 0;

        let valor_t = parseFloat(document.getElementById('costoxhora').value);
        let costo_g = parseFloat(document.getElementById('costoxgramo').value);

        this.pintado == true ? ganancia = 2.5: ganancia = 2; // se opta por esta forma por cuestiones de prolijidad.
        costo = this.material * costo_g + this.tiempo * valor_t;
        total = (costo)*ganancia;
        margen = total-costo;
        valores = [total,margen];
        return valores;
    }
};

//se genera un arreglo con objetos Impresion en base a los datos precargados para simular una Base de datos
entradas.forEach(objeto => { 
    archivoImpresiones.push(new Impresion(objeto.indice,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo));
});


// Función que agrega un nuevo trabajo de impresion a la lista. Luego actualiza la tabla para mostrarlo (indirectamente).
// Parámetros: ninguno.
// Afecta: archivoImpresiones.
// Retorna: ninguno.
const agregar = () => {
    
    //variables requeridas para crear el objeto.
    let cliente, modelo, material, pintura= "";
    let tiempo = 0;

    //variable para alojar el retorno de la funcion del objeto.
    let datos = [];

    if (confirm("¿Desea cargar un nuevo trabajo?") == true) {
        //solicitud de datos
        cliente = prompt("Ingrese el nombre del cliente");
        modelo = prompt("Ingrese una descripción del modelo a imprimir");

        do{ //validación de tipo
            material = parseFloat(prompt("Ingrese cantidad estimada de material en gramos"));
        }while (isNaN(material));

        pintura = confirm("¿El modelo será pintado?");

        do{ //validación de tipo
            tiempo = parseFloat(prompt("Ingrese el tiempo estimado de impresion en horas"));
        }while (isNaN(tiempo));
    
        let impresion = new Impresion(generarID(),cliente,modelo,material,pintura,tiempo);
        datos = impresion.calcularValores();
        alert(`El valor final del trabajo es $${datos[0]}, con una ganancia de $${datos[1]}`);
        archivoImpresiones.push(impresion);
       
        representaArreglo(archivoImpresiones);
    }
};

// Función que elimina un trabajo de impresión de la lista según su ID. Luego actualiza la tabla para mostrarlo (indirectamente).
// Parámetros: ninguno.
// Afecta: archivoImpresiones.
// Retorna: ninguno.
const eliminar = () => {
    let objetivo = 0;
    do{
        objetivo = prompt("Ingrese el índice del registro a eliminar");
    }while (isNaN(objetivo));

    if(confirm("Está seguro que quiere eliminarlo?")) { //SEGUIR ACA
        if(!(archivoImpresiones.find(elemento => elemento.indice == objetivo)===undefined)){
            archivoImpresiones.splice(archivoImpresiones.indexOf(archivoImpresiones.find(elemento => elemento.indice == objetivo)),1);
            representaArreglo(archivoImpresiones);
            alert("Regsitro eliminado");
        }else{
            alert("El registro no exsite");
        }
    }
};

// Función que busca un registro según el contenido del cuadro de búsqueda. Muestra el arreglo resultante (indirectamente).
// Parámetros: ninguno.
// Afecta: ninguno.
// Retorna: ninguno.
const buscar = () => {
    let objetivo =  document.getElementById('buscareg').value
    objetivo = objetivo.toUpperCase();
    representaArreglo(archivoImpresiones.filter(elemento => elemento.indice == objetivo || elemento.cliente.toUpperCase().includes(objetivo)|| elemento.modelo.toUpperCase().includes(objetivo)));
};

// Función que borra la tabla, luego muestra el arreglo parámetro en ella (indirectamente).
// Parámetros: arreglo que contiene los trabajos de impresión.
// Afecta: ninguno.
// Retorna: ninguno.
const representaArreglo = (arreglo) => {
    let datos = [];
    limpiarCuerpo();
    arreglo.forEach(objeto => {
        datos = objeto.calcularValores();
        mostrarEnTabla(objeto.indice,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo,datos);
    });
};

// Función que muestra los datos en la tabla.
// Parámetros: propiedades del objeto que se quiere mostrar.
// Afecta: ninguno.
// Retorna: ninguno.
const mostrarEnTabla = (indice,cliente,modelo,material,pintura,tiempo,valores) =>{ 
    let pinturamsg = "";

    pintura ? pinturamsg = "si" : pinturamsg = "no";

    document.getElementById('Tabla1').insertRow(-1).innerHTML = `<tr>
        <td>${indice}</td><td>${cliente}</td><td>${modelo}</td>
        <td>${material}g</td><td>${pinturamsg}</td>
        <td>${tiempo} hs</td><td>$${valores[1]}</td><td>$${valores[0]}</td><tr>`
};

// Función que genera un ID consecutivo al último. Si no hay datos, asigna el valor 1
// Parámetros: ninguno.
// Afecta: ninguno.
// Retorna: indice numérico.
const generarID = () =>{
    let nuevoIndice = 1;
    if(archivoImpresiones.length > 0) nuevoIndice = archivoImpresiones[archivoImpresiones.length - 1].indice + 1;
    return nuevoIndice;
};

// Función que borra la tabla para evitar duplicidad de entradas.
// Parámetros: ninguno.
// Afecta: tabla HTML
// Retorna: ninguno.
const limpiarCuerpo = () => {
    document.getElementById('Tabla1').innerHTML= `
        <thead>
            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Modelo</th>
                <th>Material</th>
                <th>Pintura</th>
                <th>Tiempo</th>
                <th>Ganancia</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody id="body">
            <!--Contenido de la tabla-->
        </tbody>`
};

// Función que muestra los datos de ejemplo al cargar la página.
// Parámetros: ninguno.
// Afecta: ninguno.
// Retorna: ninguno.
const iniciado = () => {
    representaArreglo(archivoImpresiones);
};