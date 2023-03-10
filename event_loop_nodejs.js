// (async () => {
//     await Promise.all([
//     setImmediate(() => console.log('setImediate')),
//     setTimeout(() => console.log('setTimeout'), 0),
//     Promise.resolve(2).then((res) => {
//         setImmediate(() => console.log('scoped setImediate'));
//         console.log('promise.resolve =', res);
//         setTimeout(() => console.log('scoped setTimeout'), 0);
//     })
// ]);
// })();

// (() => {
//     console.log("hola")
// })();


// async function async1() {
//     console.log('async1 start'); //2
//     await async2();
//     // async2().then(() => console.log('async1 end'));
//     console.log('async1 end'); //Micro 1
//     // console.log('async2 end'); //4
// }
// async function async2() {
// 	console.log('async2'); //3
// }

// console.log('script start'); //1

// setImmediate(()=> console.log('setImmediate'));
// setTimeout(function() {
//     console.log('setTimeout'); // Macro 1
// }, 0)


// async1();

// new Promise(function(resolve) {
//     console.log('promise1'); //4
//     resolve();
// }).then(function() {
//     console.log('promise2'); //Micro 2
// })
// console.log('script end'); //5

///EJERCICIO NUEVO
Promise.resolve().then(() => console.log('promise1 callback')); // 1 (Microtask queue)

Promise.resolve().then(() => { // 2 (Microtask queue)

    console.log('promise2 callback'); // 2.1

    process.nextTick(() => console.log('next tick inside promise2')); // 2.2 (Nextick queue)

});
Promise.resolve().then(() => { //3

    console.log('promise2  de 2 callback'); // 3.1

});

console.log("hola"); // 4 (Stack execution)

setImmediate(() => console.log('immediate1 callback')); //5 (Inmediate queue)

setImmediate(() => console.log('immediate2 callback')); //6 (Inmediate queue)

process.nextTick(() => console.log('next tick1 callback')); //7 (Nextick queue)

process.nextTick(() => console.log('next tick2 callback')); //8 (Nextick queue)

setTimeout(() => console.log('set timeout'), 0); // 9 (Timer queue)
setTimeout(() => console.log('set timeout1'), 0); // 10 (Timer queue)
setTimeout(() => console.log('set timeout2'), 0); // 11 (Timer queue)

setImmediate(() => console.log('immediate3 callback')); // 12 (Inmediate queue)

const promesa = new Promise((resolve, reject) => { //13 (Stack execution)
    console.log("En la promesa"); //13.5
    return resolve(9)
});

promesa.then(val => console.log('Valor de la promesa', val)); //14 (Microtask queue)

//Orden ejecucion: 4, 13.5, 7, 8, 1, 2, 2.1, 3, 3.1, 14, 2.2, 9, 10, 11, 5, 6, 12