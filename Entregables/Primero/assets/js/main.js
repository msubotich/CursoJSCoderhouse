//función que solicita datos al usuario para cargarlos en la tabla
document.getElementById('costoxgramo').value = "2.5"
document.getElementById('costoxhora').value = "150"

const agregar = () => {
    let cliente = "";
    let modelo = "";
    let costo_g = parseFloat(document.getElementById('costoxgramo').value);
    let material = "";
    let pintura = "";
    let pinturamsg = "";
    let tiempo = 0;
    let valor_t = parseFloat(document.getElementById('costoxhora').value);
    let ganancia = 0;
    let costo = 0;
    let total = 0;

    let opcion = confirm("¿Desea cargar un nuevo trabajo?");
    if (opcion == true) {
        do{
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
        
            //cálculo de ganancia y total
            if (pintura == true){ganancia = 2.5}else{ganancia = 2}	
            costo = material * costo_g + tiempo * valor_t;
            total = (costo)*ganancia;

            //confirmación de datos y carga en tabla
            alert(`El valor final del trabajo es $${total}, con una ganancia de $${total-costo}`);
            if(pintura){pinturamsg = "si"}else{pinturamsg = "no"};

            document.getElementById('Tabla1').insertRow(-1).innerHTML = `
            <td>${cliente}</td><td>${modelo}</td>
            <td>${material}g</td><td>${pinturamsg}</td>
            <td>${tiempo} hs</td><td>$${total-costo}</td><td>$${total}</td>`

        }while (opcion = confirm("¿Desea cargar un nuevo trabajo?"));
    }
}
