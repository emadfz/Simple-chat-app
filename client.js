const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input');
const userName = prompt("what is your name ?");
appendMessage("you have Joined the Chat "+ userName);
socket.emit('new-user', userName); 

socket.on('chat-message', data => {
  appendMessage(`${data.name} : ${data.message}`);
});

socket.on('user-connected', userName => {
  appendMessage(userName+" just joined the chatting room");
});

socket.on('user-disconnected', userName => {
  appendMessage(userName+" just left");
});

messageForm.addEventListener('submit', e=>{
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  appendMessage(`You : ${message}`);
  messageInput.value = '';
});

function appendMessage(message){
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

