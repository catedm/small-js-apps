// Revealing Module Pattern
const ItemCtrl = (function() {
  let data = [];

  function add(item) {
    data.push(item);
    console.log('item added...');
  };

  function get(id) {
    return data.find(item => {
      return item.id === id;
    });
  };

  return {
    add: add,
    get: get
  }

}());

ItemCtrl.add({id: 1, name: 'John'});
ItemCtrl.add({id: 2, name: 'Mark'});
console.log(ItemCtrl.get(1));
