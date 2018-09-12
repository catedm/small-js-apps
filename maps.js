// MAPS = key value pairs - can use ANY type as a key or a value

const map1 = new Map();

// Set some keys
const key1 = 'some string',
      key2 = {},
      key3 = function() {};

// Set map values by key
map1.set(key1, 'Value of key 1');
map1.set(key2, 'Value of key 2');
map1.set(key3, 'Value of key 3');

// Get values by key
console.log(map1.get(key1), map1.get(key2), map1.get(key3));

// count values
console.log(map1.size);

// ITERATING through maps

// loop using for...of to get keys and values
for (let [key, value] of map1) {
  console.log(`${key} = ${value}`);
}

// Iterate keys only
for (let key of map1.keys()) {
  console.log(`${key}`);
}

// Iterate values only
for (let value of map1.values()) {
  console.log(`${value}`);
}

// Loop using for each
map1.forEach(function(value, key) {
  console.log(`${key} = ${value}`);
});

// convert maps to array

// create an array of the key value pairs
const keyValArr = Array.from(map1);
console.log(keyValArr);


// create an array of the values
const valArr = Array.from(map1.values());
console.log(valArr);

// create an array of the keys
const keyArr = Array.from(map1.keys());
console.log(keyArr);
