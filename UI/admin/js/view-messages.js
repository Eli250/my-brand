'use strict';

const token = JSON.parse(localStorage.getItem('AccessToken'));

const getResources = async () => {
  const response = await fetch(
    `https://develi-api.herokuapp.com/api/v1/queries`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) throw new Error('Cannot fetch data.');

  const data = await response.json();
  return data;
};

getResources().then((data) => {
  data.data.forEach((msg) => {
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

    const sender = document.createTextNode(msg.senderName + ' ');
    senderDiv.appendChild(sender);
    const span = document.createElement('span');
    const email = document.createTextNode(msg.email);
    span.appendChild(email);
    senderDiv.appendChild(span);
    messageDiv.appendChild(senderDiv);

    const dateDiv = document.createElement('div');
    const dateData = document.createTextNode(msg.date_sent);
    dateDiv.appendChild(dateData);
    messageDiv.appendChild(dateDiv);

    messageSection.appendChild(messageDiv);
  });
});
