const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");var audio = new Audio('audio/messenger_tone.mp3');

// function which wll append info to the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }


}
// ask name to the user
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// if a new user noins, receive the event from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

// if a server sends a message received it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// if a user leave the chat, append the input to the container
socket.on('left', name =>{
    append(`${name}: left the chat`, 'right')
})


// if the form get submitted send the message to the user
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value ='';
})