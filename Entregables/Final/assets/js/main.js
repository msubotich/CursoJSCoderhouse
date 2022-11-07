let archivoImpresiones = [];

class Impresion{
    //propiedades
    constructor(id,cliente,modelo,material,pintado,tiempo){
        this.id = id;
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

        this.pintado == true ? ganancia = 2.5: ganancia = 2;
        costo = this.material * costo_g + this.tiempo * valor_t;
        total = (costo)*ganancia;
        margen = total-costo;
        valores = [total,margen];
        return valores;
    }
};

{   //carga los registros desde el localstorage si existen. Caso contrario los trae desde la API jsonplaceholder personalizada
    const obtenerData = async () =>{
        try {
            const origen = await axios.get(`https://my-json-server.typicode.com/msubotich/CursoJSCoderhouse/entradas`);
            console.log("Base de datos de ejemplo cargada");
            origen.data.forEach(objeto => {
                archivoImpresiones.push(new Impresion(objeto.id,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo));
            });
            representaArreglo();
        } catch (error) {
            console.log(error);
        }
    }

    if (localStorage.getItem('archivoImpresiones') != null){
        let entradas = [];
        entradas = JSON.parse(window.localStorage.getItem('archivoImpresiones'));
        console.log('Base de datos local cargada')
        entradas.forEach(objeto => {
            archivoImpresiones.push(new Impresion(objeto.id,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo));
        });
    }else{
        console.log('Base de datos remota cargada')
        obtenerData();
    }   
} //se confina la variable entradas para que se libere al terminar este proceso y no ocupar memoria.

document.getElementById('costoxgramo').value = "2.5"; //valores por defecto.
document.getElementById('costoxhora').value = "150";
//---------------------------------------------------------------------------------------------

// Función que agrega un nuevo trabajo de impresion a la lista. Luego actualiza la tabla para mostrarlo (indirectamente).
// Parámetros: ninguno.
// Afecta: archivoImpresiones.
// Retorna: ninguno.
const agregar = () => {
    
    let formulario = document.createElement("div");
    formulario.innerHTML = `
            <h5>Complete los datos. Todos son obligatorios<h5>
            </br>
            <label for="ClientInput">Cliente</label>
            <input autocomplete="off" class="form-control d-inline-block" id="ClientInput" style="width: 89%" type="text"/>

            <label for="ModelInput">Modelo</label>
            <input autocomplete="off" class="form-control d-inline-block" id="ModelInput" style="width: 89%;margin-bottom:2rem;" type="text"/>

            <label for="MaterialInput">Material (g)</label>
            <input autocomplete="off" class="form-control d-inline-block w-25" id="MaterialInput" style="width: 30%;" type="number"/>

            <label for="TimeInput">Tiempo (h)</label>
            <input autocomplete="off" class="form-control d-inline-block w-25" id="TimeInput" style="width: 30%;" type="number"/>

            <label class="form-label" for="PaintSelect" style="margin-top:2rem;">Pintado</label>
            <input autocomplete="off" type="checkbox" class="form-check-input" id="PaintSelect">
          `;

    Swal.fire({
        title: 'Nuevo trabajo',
        html: formulario,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",

    }).then(resultado => {
        if (resultado.value) {
        cliente = document.getElementById('ClientInput').value;
        modelo = document.getElementById('ModelInput').value;
        material = parseFloat(document.getElementById('MaterialInput').value);
        pintura = document.getElementById('PaintSelect').checked;
        tiempo = parseFloat(document.getElementById('TimeInput').value);
        
        if(cliente != "" && modelo != "" && material != "" && tiempo != ""){
            let impresion = new Impresion(generarID(),cliente,modelo,material,pintura,tiempo);
            archivoImpresiones.push(impresion);
            localStorage.archivoImpresiones = JSON.stringify(archivoImpresiones); //guarda en local storage
            representaArreglo(archivoImpresiones);
        }else{
            Swal.fire('Todos los datos son obligatorios');
            setTimeout(() => {
                agregar();
              }, 1000)
        }

        }
    });
};

// Función que elimina un trabajo de impresión de la lista según su ID. Luego actualiza la tabla para mostrarlo (indirectamente).
// Parámetros: ninguno.
// Afecta: archivoImpresiones.
// Retorna: ninguno.
  const eliminar = () => {

    Swal
    .fire({
        title: "Eliminación de registros",
        text: "Ingrese el ID del registro a eliminar",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            Swal.fire({
                title: '¿Está seguro que quiere eliminarlo?',
                text: "Esta acción es IRREVERSIBLE",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if(!(archivoImpresiones.find(elemento => elemento.id == resultado.value)===undefined)){
                        archivoImpresiones.splice(archivoImpresiones.indexOf(archivoImpresiones.find(elemento => elemento.id == resultado.value)),1);
                        localStorage.archivoImpresiones = JSON.stringify(archivoImpresiones); //guarda en local storage
                        representaArreglo(archivoImpresiones);
                        Swal.fire('Registro eliminado');
                    }else{
                        Swal.fire('El registro no existe');
                    }
                    
                }
            })
            }
    }); 
};

// Función que busca un registro según el contenido del cuadro de búsqueda. Muestra el arreglo resultante (indirectamente).
// Parámetros: ninguno.
// Afecta: ninguno.
// Retorna: ninguno.
  const buscar = () => {
    let objetivo =  document.getElementById('buscareg').value
    objetivo = objetivo.toUpperCase();
    representaArreglo(archivoImpresiones.filter(elemento => elemento.id == objetivo || elemento.cliente.toUpperCase().includes(objetivo)|| elemento.modelo.toUpperCase().includes(objetivo)));
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
        mostrarEnTabla(objeto.id,objeto.cliente,objeto.modelo,objeto.material,objeto.pintado,objeto.tiempo,datos);
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
    if(archivoImpresiones.length > 0) nuevoIndice = archivoImpresiones[archivoImpresiones.length - 1].id + 1;
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

representaArreglo();