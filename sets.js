// SETS - store unique values of any type

const set1 = new Set();

// add values to set1
set1.add(100);
set1.add(100); // this will not be added because they must be unique values
set1.add('a string');
set1.add({name: 'John'});
set1.add(false);

const set2 = new Set([1, true, 'string']);

// get count
console.log(set2.size);

// check for values
console.log(set1.has(100));

// delete from set
set1.delete(100);
console.log(set1);

// iterate thru sets

// for..of
for (let item of set1) {
  console.log(item);
}

// forEach
set1.forEach(item => {
  console.log(item);
})

// convert sets into arrays
const setArray = Array.from(set1);
console.log(setArray);
