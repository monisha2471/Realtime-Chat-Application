const socket = io('http://localhost:8000');

// Get DOM elements in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

// Audio that will play on receiving msgs
var audio = new Audio('ting.mp3');  //import ting

//Function which will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'){   //if someone has sent a message
        audio.play();
    }
}

// Ask new user for his name and let the server know
const name = prompt("Enter your Name to join");
socket.emit('new-user-joined',name);
// this means we have already writen in server about new user joined,,, emit that event with name ie socket emits an event called new user joined which is already defined in nodeserver

//if new user joins, receive the event from the server
socket.on('user-joined',name => {
    append(`${name} joined the chat`,'right');        
}) // whenever user joins, run the append function

// if the sever send a message, receive it
socket.on('receive',data => {
    append(`${data.name}: ${data.message}`,'left');        
}) // for receive event

//if user leaves the chat, append the info to the container
socket.on('leave-chat',name => {
    append(`${name} left the chat`,'right');        
}) // for leave event described by server, listened by client


//if the form gets submited, send server a message
form.addEventListener('submit',(e)=>{   // event listener to send a message
    e.preventDefault(); //  to prevent reload
    const message = messageInp.value;
    append(`You: ${message}`, 'right');  //template literals format in js
    socket.emit('send', message);
    messageInp.value = ''  // to make the text area blank after we send a message
})