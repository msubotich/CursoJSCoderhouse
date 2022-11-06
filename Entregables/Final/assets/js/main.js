let archivoImpresiones = [];

const obtenerData = async () =>{

    try {
        const origen = await axios(`https://my-json-server.typicode.com/msubotich/CursoJSCoderhouse/entradas`);
        console.log("Base de datos de ejemplo cargada");
        console.log(origen.data);
        return origen.data;
    } catch (error) {
        console.log(error);
    }

}

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
{ 
    let entradas = [];
    if (localStorage.getItem('archivoImpresiones') != null){
        entradas = JSON.parse(window.localStorage.getItem('archivoImpresiones'));
        console.log('hay')
        entradas.forEach(objeto => {
            archivoImpresiones.push(new Impresion(objeto.indice,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo));
        });
    }else{
        console.log('no hay')
        entradas=obtenerData();
        console.log("salida de promesa",entradas);
        //entradas.forEach(objeto => {
        //    archivoImpresiones.push(new Impresion(objeto.indice,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo));
        //});
    }   
} //se confina la variable entradas para que se libere al terminar este proceso y no ocupar memoria.

//genera los objetos en base a los datos que tomó.

document.getElementById('costoxgramo').value = "2.5";
document.getElementById('costoxhora').value = "150";
//---------------------------------------------------------------------------------------------

// Función que muestra el formulario para agregar inpresiones.
//parametros: ninguno.
//afecta: ninguno.
//retorna: ninguno.
const mostrarForm = () => {
    let divForm = document.getElementById('newPrintForm'); //togglea el form de entrada de datos
    (divForm.style.display === "none")?divForm.style.display = "block":divForm.style.display = "none";
}

// Función que agrega un nuevo trabajo de impresion a la lista. Luego actualiza la tabla para mostrarlo (indirectamente).
// Parámetros: ninguno.
// Afecta: archivoImpresiones.
// Retorna: ninguno.
const agregar = () => {
    
    //variables requeridas para crear el objeto.
    let cliente, modelo, material, pintura= "";
    let tiempo = 0;
    let datos = []; //variable para alojar el retorno de la funcion del objeto.   


    cliente = document.getElementById('ClientInput').value;
    modelo = document.getElementById('ModelInput').value;
    material = parseFloat(document.getElementById('MaterialInput').value);
    pintura = document.getElementById('PaintSelect').value;
    tiempo = parseFloat(document.getElementById('TimeInput').value);
    
    console.log(cliente, material, tiempo,pintura,modelo);

    let impresion = new Impresion(generarID(),cliente,modelo,material,pintura,tiempo);
    datos = impresion.calcularValores();

    archivoImpresiones.push(impresion);

    localStorage.archivoImpresiones = JSON.stringify(archivoImpresiones); //guarda en local storage
    for (let index = 0; index < 4; index++) {
        document.getElementById("newPrintForm").getElementsByTagName("input")[index].value = "";
    } 

    mostrarForm();
    representaArreglo(archivoImpresiones);
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

    if(confirm("Está seguro que quiere eliminarlo?")) {
        if(!(archivoImpresiones.find(elemento => elemento.indice == objetivo)===undefined)){
            archivoImpresiones.splice(archivoImpresiones.indexOf(archivoImpresiones.find(elemento => elemento.indice == objetivo)),1);
            localStorage.archivoImpresiones = JSON.stringify(archivoImpresiones); //guarda en local storage
            representaArreglo(archivoImpresiones);
            alert("Regsitro eliminado");
        }else{
            alert("El registro no existe");
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
const representaArreglo = (arreglo=archivoImpresiones) => {
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

//llena la tabla al inicio, por defecto.
representaArreglo();
