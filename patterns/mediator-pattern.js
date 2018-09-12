const User = function(name) {
  this.name = name;
};

User.prototype = {
  send: function(msg, to) {
    this.chatroom.send(msg, this, to);
  },
  receive: function(msg, from) {
    console.log(`${from.name} to ${this.name}: ${msg}`);
  }
}

const Chatroom = function() {
  let users = {}; // list of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(msg, from, to) {
      if (to) {
        // Single user message
        to.receive(msg, from);
      } else {
        // Mass message
        for(key in users) {
          if(users[key] !== from) {
            users[key].receive(msg, from);
          }
        }
      }
    }
  }
}

const brad = new User('Brad');
const jeff = new User('Jeff');
const sarah = new User('Sarah');

const chatroom = new Chatroom();

chatroom.register(brad);
chatroom.register(jeff);
chatroom.register(sarah);

brad.send('Hello Jeff', jeff);
sarah.send('Hello Brad, you are the best dev ever!', brad);
jeff.send('Hello everyone!');
