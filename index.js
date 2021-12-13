//Node server which will handle socket io conections
//first i installed npm i scoket.io after running npm init in nodeserver terminal
//cd nodeServer
///npm init
//npm i socket.io
//then create a file called index.js and write these
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', socket => {
  //connection starts listening to each and every event
  //if any new user joins , let other other users know
    socket.on('new-user-joined',name => {
          console.log("New user", name);
          users[socket.id] = name; //append the name in users then emit it
          socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message => {
      // if someone sends a message broadcast it to other people
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });  // user is giving his name and his message 

    socket.on('disconnect',message => {
      // if someone leaves a chat let others know  disconnect and connections are built in event where as send and new-user are defind by me
        socket.broadcast.emit('leave-chat',users[socket.id])
        delete users[socket.id];  //every connection has a unique id which is know as socket.id we are not identifing by name becoz its not unique
    });  // user is giving his name and his message 
})
//whenever connection comes in socket then, jabbi scoket.on user joined event event milta hai to, users me uska name append kardena aur user joined karke broadcast karna
// whenever someone sends a message then, make others receive it

//send , receive, user joined are events which are named by us only

// at the end run nodemon .\index.js to run node server not at the end whenever you want to run just do this only