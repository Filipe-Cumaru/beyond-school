/**
 * @description Variáveis
 */

//  var name = 'Filipe'
//  var age = 22

//  let name = 'Filipe'
//  let age = 22

//  const name = 'Filipe'
//  const age = 22

//  console.log('Name: ', name);
//  console.log('Age: ', age);

 /**
  * @description Operações lógicas e booleanas
  */

//   let ano, idadePaulo
//   ano = 2020
//   idadePaulo = 22

//   console.log('Paulo nasceu: ', ano - idadePaulo)

//   let likePacoca, hasPacoca
//   likePacoca = true
//   hasPacoca = false
//   let pacocaServida = likePacoca && hasPacoca

//   console.log('pacoca servida?', pacocaServida)

  /**
   * @description if/else, operador ternário e valores booleanos
   */

//    let likePacoca, hasPacoca
//    likePacoca = true
//    hasPacoca = false

//    if (likePacoca) {
//        console.log('pacoca servida')
//    }
//    else if (!likePacoca && hasPacoca) {
//        console.log('triste :(')
//    }
//    else {
//        console.log('...')
//    }

//    let servido = likePacoca ? 'sim' : 'nao'
//    console.log(servido)

//    switch (likePacoca) {
//         case true:
//            console.log('likePacoca de um switch')
//            break;
//         case false:
//             console.log('triste de um switch :(')
//             break;
//         default:
//             console.log('default')
//             break
//    }

/**
 * @description Objetos
 */

//  const person = {
//      name: 'Filipe',
//      age: 22
//  }

//  OK! Modificando atributo
//  person.name = 'Testa'

//  Erro! Modificando referência const.
// person = {
//     name: 'Philippe',
//     age: 23
// }

//  console.log('Person', person)

 /**
  * @description Arrays
  */

//   const myArray = ['Filipe', 22, false]

//   console.log(myArray)

/**
 * @description Funções
 */

//  ... -> argumentos são reunidos num array
//  function joinner (...arr) {
//      return arr.join(',')
//  }

//  let result = joinner('di Cazzo', 'Testa')
//  console.log(result)

//  function fullName (firstName, lastName) {
//      return firstName + ' ' + lastName
//  }

// //  ... -> os elementos do array são desempacotados
//  result = fullName(...['Testa', 'di Cazzo'])
//  console.log(result)

/**
 * @description Loops
 */

//  for (let i = 0; i < 5; i++) {
//      console.log(i)
//  }

//  const person = {
//      name: 'Filipe',
//      age: 22
//  }

//  for (attr in person) {
//     //  attr é o campo
//      console.log(attr)
//     //  acessando o valor do campo attr
//     console.log(person[attr])
//  }

//  const arr = ['Minchia', 'Cazzo']
//  for (let item of arr) {
//      console.log(item)
//  }

//  arr.forEach(function (item) {
//      console.log(item)
//  })

 /**
  * @description Escopos
  */

  // let age = 20

  // if (age >= 18) {
  //   // var -> global
  //     var name = 'giuda ladro'
  //   // let, const -> local
  //   //   const name = 'giuda ladro'
  //     console.log(name)
  // }
  // else {
  //     console.log('else', name)
  // }

/**
 * @description Promises
 */

 /**
  * @description Wait time miliseconds before welcome message.
  * @param {Number} time
  */
//  async function waitBeforeWelcome(time) {
//    const welcome = new Promise((resolve, reject) => {
//     if (time < 10000) {
//       setTimeout(() => {
//         resolve('Welcome Maguila!')
//       }, time)
//     }
//     else {
//       const error = new Error('time must be < 10 s')
//       reject(error)
//     }
//    })

//    const presentation = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Quem eh esse Wel? Vou descer a porrada nele!')
//     }, 1000)
//    })

//    try {
//     let msg = await welcome
//     console.log(msg)
//     msg = await presentation
//     console.log(msg)
//    }
//    catch (error) {
//      console.log(error)
//    }
//  }

//  waitBeforeWelcome(20000)

/**
* @description Classes
*/
const Robot = require('./robot').Robot
const version = require('./robot').version

console.log(version)

const myRobot = new Robot('Oi', 0, 0)

myRobot.walkForward()
myRobot.walkForward()
myRobot.walkBackward()
console.log(myRobot.getPos())
myRobot.teleport(1321, 9856)
console.log(myRobot.getPos())