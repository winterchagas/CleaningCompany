//CHALLENGE
//ALLWAYS CAPITALIZE THE FIRST WORD
//ALLWAYS CAPITALIZE THE LAST WORD
//LOWERCASE THESE WORDS ['a', 'the' , 'to', 'at', 'in', 'with', 'and', 'but', 'or']
//IF THEY ARE NOT FIRST OR LAST
//
// const capitalize = (string) => {
//     let arrayWords = string.split(' ');
//     let lowerArray = ['a', 'the' , 'to', 'at', 'in', 'with', 'and', 'but', 'or'];
//     let capArray = [];
//     arrayWords.forEach(word => {
//         if (arrayWords.indexOf(word) === 0 || arrayWords.indexOf(word) === arrayWords.length -1) {
//             let tempString = '';
//             for (let letter of word) {
//                 if(word.indexOf(letter) === 0) {
//                     tempString += letter.toUpperCase();
//                 } else {
//                     tempString += letter.toLowerCase();
//                 }
//             }
//             capArray.push(tempString);
//         } else {
//             if (!lowerArray.some(x => x === word.toLowerCase())) {
//                 let tempString2 = '';
//                 for (let letter of word) {
//                     if(word.indexOf(letter) === 0) {
//                         tempString2 += letter.toUpperCase();
//                     } else {
//                         tempString2 += letter.toLowerCase();
//                     }
//                 }
//                 capArray.push(tempString2);
//             } else {
//                 let tempString1 = '';
//                 for (let letter of word) {
//                     tempString1 += letter.toLowerCase();
//                 }
//                 capArray.push(tempString1);
//             }
//         }
//     });
//     return capArray;
// };
//
// console.log(...capitalize('why doeS A biRd flY'));
// console.log(capitalize('A jONES THE TO AT'));


// const fruits = ["apples", "bananas", "pears"];
// const vegetables = ["corn", "potatoes", "carrots"];
//
// let  [fruit, ...egetables] = fruits;
//
// console.log(egetables);


updateCustomer = function (id, ...values) {
    console.log(id);
    console.log(values);
    for (let value of values) {
        console.log(value);
    }
};

updateCustomer(22, {stripeID: 'alo'}, {stripeID: 'alo2'});