const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// var audio = new Audio('name of ');

// It will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if(position == 'left'){
        // Audio.play();
    // }
}

const name = prompt("Enter your name to join chat:");
socket.emit('new-user-joined', name);

// If user join then let know server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
});

// If server send msg receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});
                // come from index.js
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
});


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});