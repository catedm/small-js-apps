const http = new EasyHTTP;

// get Users
http.get('http://jsonplaceholder.typicode.com/users')
  .then(data => console.log(data))
  .catch(err => console.log(err));

// user data
// const data = {
//   name: 'John Doe',
//   username: 'johndoe',
//   email: 'jdoe@gmail.com'
// }

// create post
// http.post('http://jsonplaceholder.typicode.com/users', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// create put
// http.put('http://jsonplaceholder.typicode.com/users/2', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// delete user
// http.delete('http://jsonplaceholder.typicode.com/users/2')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
