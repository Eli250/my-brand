'use strict';

function getMessages() {
  let messages = localStorage.getItem('Queries');
  if (messages === null || messages.length === 0) {
    return [];
  }
  return JSON.parse(messages);
}

let messages = getMessages();

messages.forEach((msg) => {
  const messageSection = document.querySelector('#message-content');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'messages';
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg');
  const msgContent = document.createTextNode(msg.message);
  msgDiv.appendChild(msgContent);
  messageDiv.appendChild(msgDiv);

  const senderDiv = document.createElement('div');
  senderDiv.className = 'sender';

  const sender = document.createTextNode(msg.sender + ' ');
  senderDiv.appendChild(sender);
  const span = document.createElement('span');
  const email = document.createTextNode(msg.email);
  span.appendChild(email);
  senderDiv.appendChild(span);
  messageDiv.appendChild(senderDiv);

  const dateDiv = document.createElement('div');
  const dateData = document.createTextNode(msg.date);
  dateDiv.appendChild(dateData);
  messageDiv.appendChild(dateDiv);

  messageSection.appendChild(messageDiv);
});
