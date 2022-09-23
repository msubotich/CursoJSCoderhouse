/*

Crear un programa que le permita a una persona jugar a Piedra, papel o tijera contra el computador,

indicando cuántas veces desea jugar o repetir el juego. Piedra, papel o tijera (cachipún) es un juego entre dos

personas (en este caso, tú y el computador) donde cada una de ellas de manera

independiente y secreta debe elegir una de las opciones ( piedra, papel y tijera ) y compararla

con la opción de la otra persona. Para determinar quien gana, se deben seguir las siguientes

reglas:

● Tijera le gana a papel

● Papel le gana a piedra

● Piedra le gana a tijera

● Si ambos jugadores eligen la misma opción es un empate

1.Solicitar al usuario las veces que desea que se repita el juego consecutivamente, es

decir, cuántas veces deberá jugar contra la computadora. Por cada juego, se debe

mostrar el resultado inmediatamente y luego pedir nuevamente una respuesta

dependiendo de las veces que haya indicado el usuario que desea jugar.

2. Solicitar al usuario que indique su jugada.

Las opciones son las siguientes:

  ● Piedra

  ● Papel

  ● Tijera

3. Generar una jugada automática para la máquina usando la función Math.random() de Javascript.

4. Definir a un ganador considerando la jugada del usuario y la generada automáticamente para la máquina.

5. Indicar el resultado de la partida dependiendo del caso:

  ● Felicitar al ganador en caso de ser el usuario.

  ● Indicarle al usuario que ha perdido contra la máquina en caso de que ésta sea la que gane.

  ● Declarar un empate.

En Javascript, se pueden crear números aleatorios usando la función Math.random(). Con

el siguiente código, se pueden obtener números aleatorios entre 0 y 2.

Math.floor(Math.random()*3)

Usando esta función podemos determinar la jugada de la máquina, dado que los resultados de esta

función pueden ser 0, 1 ó 2, puedes asumir que cada uno de estos números corresponde a

una jugada ( piedra, papel o tijeras ) y así definir la jugada de la máquina.

*/
const juego = () => {
  alert("Piedra, Papel o Tijeras");
  let indice = 0
  let maquina = 0;
  let jugador = 3;
  let puntosJugador = 0;
  let puntosMaquina = 0;

  let cantidad  = prompt("¿Cuántos asaltos jugarás?");

  while(indice < cantidad){
    maquina = Math.floor(Math.random()*3);

    while(isNaN(jugador) | jugador > 2){
      jugador = parseInt(prompt("Ingrese 0 para piedra, 1 para papel, 2 para tijera"));
    }

    switch(jugador){
      case 0:
        switch(maquina){
          case 0: 
            alert("Ambos eligieron Piedra, este asalto es un empate");
            break;
          case 1: 
            alert("La máquina eligió Papel, este asalto es de la máquina");
            puntosMaquina++;
            break;
          case 2:
            alert("La máquina eligió Tijera, este asalto es tuyo");
            puntosJugador++;
            break;
        }
        break;
      case 1:
        switch(maquina){
          case 0: alert("La máquina eligió Piedra, este asalto es tuyo");
            puntosJugador++;
            break;
          case 1: 
            alert("Ambos eligieron Papel, este asalto es un empate");
            break;
          case 2:
            alert("La máquina eligió Tijera, este asalto es de la máquina");
            puntosMaquina++;
            break;
        }
        break;
      case 2:
        switch(maquina){
          case 0: alert("La máquina eligió Piedra, este asalto es de la máquina");
            puntosMaquina++;
            break;
          case 1: 
            alert("La máquina eligió Papel, este asalto es tuyo");
            puntosJugador++;
            break;
          case 2:
            alert("Ambos eligieron Tijera, este asalto es un empate");
            break;
        }
        break;
    }
    indice++
    jugador = 3;
  }

  let resultado = puntosJugador - puntosMaquina;
  console.log("calculo de resultados",resultado)
  
  
  if (resultado < 0){
      alert("La máquina gana por " + puntosMaquina + " a " + puntosJugador);}
  else if(resultado==0){
      alert("El juego es un empate en " +  puntosMaquina);}
  else
      alert("Ganas por " + puntosJugador+ " a " + puntosMaquina);
}



const comienzo = () => {
//Comienzo del juego
let opcion = confirm("¿Desea ver el reglamento?");
let opcion1 = false;

  if (opcion == true) {
      alert("Cada jugador debe elegir una de las opciones ( piedra, papel y tijera ) y compararla con la opción de la otra persona. Para determinar quien gana, se deben seguir las siguientes reglas: Tijera le gana a papel. Papel le gana a piedra. Piedra le gana a tijera. Si ambos jugadores eligen la misma opción es un empate")
  }


do{
  
  juego();

  opcion1 = confirm("¿Desea jugar nuevamente?");

}while(opcion1 === true);
}
