// Basic structure

// (function() {
//   // Declare private variables and functions
//
//
//   return {
//     // Declare public variables and functions
//   };
// })();

// Standard module pattern
// const UICtrl = (function() {
//   let text = 'Hello world';
//
//   const changeText = function() {
//     const element = document.querySelector('h1');
//     element.textContent = text;
//   };
//
//   return {
//     callChangeText: function() {
//       changeText();
//       console.log(text);
//     }
//   };
// })();
//
// UICtrl.callChangeText();

// Revealing Module Pattern
// const ItemCtrl = (function() {
//   let data = [];
//
//   function add(item) {
//     data.push(item);
//     console.log('item added...');
//   };
//
//   function get(id) {
//     return data.find(item => {
//       return item.id === id;
//     });
//   };
//
//   return {
//     add: add,
//     get: get
//   }
//
// }());
//
// ItemCtrl.add({id: 1, name: 'John'});
// ItemCtrl.add({id: 2, name: 'Mark'});
// console.log(ItemCtrl.get(1));

// Singleton Pattern
// const Singleton = (function() {
//   let instance;
//
//   function createInstance() {
//     const object = new Object({name: 'Brad'});
//     return object;
//   };
//
//   return {
//     getInstance: function() {
//       if (!instance) {
//         instance = createInstance();
//       }
//       return instance;
//     }
//   }
// }());
//
// const instanceA = Singleton.getInstance();
// const instanceB = Singleton.getInstance();
//
// console.log(instanceA === instanceB);
