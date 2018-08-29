document.getElementById('button-1').addEventListener('click', getText);
document.getElementById('button-2').addEventListener('click', getJson);
document.getElementById('button-3').addEventListener('click', getExternal);


// Get local text file data
function getText() {
  fetch('test.txt')
  .then(res => res.text())
  .then(data => {
    document.getElementById('output').innerHTML = data;
  })
  .catch(err => console.log(err));
}

// get local json data
function getJson() {
  fetch('posts.json')
  .then(res => res.json())
  .then(data => {
    let output = '';

    data.forEach(function(post) {
      output += `
        <li>${post.title}</li>
      `
    });

    document.getElementById('output').innerHTML = output;
  })
  .catch(err => console.log(err));
}

// get api data
function getExternal() {
  fetch('https://api.github.com/users')
  .then(res => res.json())
  .then(data => {
    let output = '';
    data.forEach(function(user) {
      output += `
        <li>${user.login}</li>
      `
    });
    document.getElementById('output').innerHTML = output;
  })
  .catch(err => console.log(err));
}
