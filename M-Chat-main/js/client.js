const socket =io('http://localhost:8000',{transports:["websocket"]});
 const username = prompt('Enter your name:');
 if (username && username.trim() !== '') {
    socket.emit('new-user-joined', username);
  } else {
    socket.emit('new-user-joined', 'Guest');
  }

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio= new Audio('ding.mp3')

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageElement.innerText = message; 
  messageContainer.append(messageElement);
  if(position==='left')
  audio.play();
};

form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`You:${message}`,'right');
socket.emit('send',message);
messageInput.value='';

})

socket.on('user-joined', (data) => {
  append(`${data} joined the chat`, 'left');
});
socket.on('receive', (data) => {
  append(`${data.name}:${data.message}`, 'left');
});

socket.on('left', (data)=>{
    append(`${data} left the chat`, 'left')
})

