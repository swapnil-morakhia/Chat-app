const socket = io('http://localhost:8000');

//get DOM elements in respective JS variables
const form= document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//Audio that will play on recieving messages
// var audio = new Audio('ting.mp3');

//function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
}

// ask new user his/her name and let the server know
const name = prompt("Enter ur name");
socket.emit('new-user-joined', name);

//if new user joins, recieve his/her name from the server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
})

//if server sends a message,receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

//if any user leaves the chat, append the info to the container
socket.on('left', data =>{
    append(`${data.name} left the chat`, 'left');
})

//if the form is  submitted, send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})

