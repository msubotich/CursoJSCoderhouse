let myArray = ['uno','dos','tres'];

let ejemplo = new Array('uno','dos','tres');

console.log(ejemplo);
console.log(myArray[1]);

for (let i = 0; i < ejemplo.length; i++) {
    console.log(ejemplo[i]);
}

ejemplo.forEach(element => {
    console.log(element);
});

document.write('<ul class="container list-group">');
ejemplo.forEach((element, index, arr)=>{
    document.write(`<li> ${ejemplo[index]} ${element} ${arr}</li>`)
});
document.write('</ul>');

console.log(ejemplo.includes('uno'));
console.log(ejemplo.some(function (){ ejemplo[0]=='uno';}));

const indice = ejemplo.findIndex(numero => ejemplo == 'uno');

/*
ejemplo.reduce();
ejemplo.find();
ejemplo.filter();
*/

let arr= [];
let mapeado = ejemplo.map((element)=>{
    arr.push(element);
});
console.log(arr);

let mensaje = 'mensaje a cortar'
console.log(mensaje.split('',20));
console.log(arr.reverse());

console.log(arr.splice(2,1));
