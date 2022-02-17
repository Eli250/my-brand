let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let sender = '';
let email = '';
let message = '';
let err = '';

const id = location.hash.split('').slice(1, location.hash.length).join('');

const token = JSON.parse(localStorage.getItem('AccessToken'));

const getResources = async () => {
  const response = await fetch(
    `http://develi-api.herokuapp.com/api/v1/articles/${id}`
  );

  if (response.status !== 200) throw new Error('Cannot fetch data.');

  const data = await response.json();
  return data;
};

getResources().then((data) => {
  console.log(data);
  const body = document.querySelector('body');
  const postSection = document.createElement('section');
  postSection.classList.add('post');

  const myPostDiv = document.createElement('div');
  myPostDiv.classList.add('max-width');

  const postTitle = document.createElement('h2');
  postTitle.classList.add('title');
  const titleContent = document.createTextNode(data.data.title);
  postTitle.appendChild(titleContent);
  const subTitle = document.createElement('h4');
  subTitle.classList.add('sub-title');
  const postOwner = document.createTextNode(data.data.author);
  subTitle.appendChild(postOwner);
  const pSpan = document.createElement('span');

  const pDate = document.createTextNode(` | ${data.data.created_on} |`);
  pSpan.appendChild(pDate);
  subTitle.appendChild(pSpan);

  const divPostContent = document.createElement('div');
  divPostContent.classList.add('post-content');

  const divPostImg = document.createElement('div');
  divPostImg.className = 'post-img';
  const img = document.createElement('img');
  img.src = data.data.image;
  divPostImg.appendChild(img);
  divPostContent.appendChild(divPostImg);

  const descDiv = document.createElement('div');
  descDiv.id = 'description';
  const descH5 = document.createElement('h5');
  const descContent = document.createTextNode(data.data.content);
  descH5.appendChild(descContent);
  descDiv.appendChild(descH5);
  divPostContent.appendChild(descDiv);

  const postDetailDiv = document.createElement('div');
  postDetailDiv.className = 'post-details';
  const p = document.createElement('p');
  const pContent = document.createTextNode(data.data.content);
  p.appendChild(pContent);
  postDetailDiv.appendChild(p);
  divPostContent.appendChild(postDetailDiv);

  const lineDiv = document.createElement('div');
  lineDiv.className = 'line';
  divPostContent.appendChild(lineDiv);

  //Display Comments

  const commentsDiv = document.createElement('div');
  commentsDiv.classList.add('column', 'left');

  const readComments = async () => {
    const response = await fetch(
      `http://develi-api.herokuapp.com/api/v1/articles/${id}/comments`
    );

    if (response.status !== 200) throw new Error('Cannot fetch data.');

    const data = await response.json();
    return data;
  };

  const commentHeaderDiv = document.createElement('div');
  commentHeaderDiv.className = 'comment-header';
  let span = document.createElement('span');
  let spanContent = document.createTextNode(data.data.comments.length);
  span.appendChild(spanContent);
  commentHeaderDiv.appendChild(span);
  let commentHeader = document.createTextNode(' Comments');
  commentHeaderDiv.appendChild(commentHeader);
  commentsDiv.appendChild(commentHeaderDiv);

  readComments().then((com) => {
    console.log(com);
    com.forEach((comment) => {
      let cDiv = document.createElement('div');
      cDiv.className = 'comments';
      let para = document.createElement('p');
      let pComment = document.createTextNode(comment.comment);
      para.appendChild(pComment);
      cDiv.appendChild(para);
      commentsDiv.appendChild(cDiv);

      const commentOwnerDiv = document.createElement('div');
      commentOwnerDiv.className = 'comment-owner';
      let sender = document.createTextNode(comment.sender);
      commentOwnerDiv.appendChild(sender);
      let cOwnerSpan = document.createElement('span');
      let date = document.createTextNode(' | ' + new Date());
      cOwnerSpan.appendChild(date);
      commentOwnerDiv.appendChild(cOwnerSpan);
      cDiv.appendChild(commentOwnerDiv);
      divPostContent.appendChild(commentsDiv);
    });
  });

  const commentFormDiv = document.createElement('div');
  commentFormDiv.classList.add('column', 'right');
  commentFormDiv.id = 'comment-section';

  const header = document.createElement('div');
  header.className = 'comments';
  const headerText = document.createTextNode('Leave a commnent');
  header.appendChild(headerText);
  commentFormDiv.appendChild(header);

  const formComment = document.createElement('form');
  formComment.setAttribute('name', 'comment-form');
  formComment.setAttribute('method', 'post');

  const fDiv = document.createElement('div');
  fDiv.classList.add('field', 'textarea');

  const txtArea = document.createElement('textarea');
  txtArea.name = 'message';
  txtArea.cols = '30';
  txtArea.rows = '10';
  txtArea.placeholder = 'Message';
  fDiv.appendChild(txtArea);
  formComment.appendChild(fDiv);

  const errDiv = document.createElement('div');
  errDiv.id = 'error';
  formComment.appendChild(errDiv);

  const fieldsDiv = document.createElement('div');
  fieldsDiv.classList.add('fields');

  const nameField = document.createElement('div');
  nameField.classList.add('field', 'name');
  const nInput = document.createElement('input');
  nInput.type = 'text';
  nInput.placeholder = 'Name';
  nInput.name = 'name';
  nameField.appendChild(nInput);
  fieldsDiv.appendChild(nameField);

  const mailfield = document.createElement('div');
  mailfield.classList.add('field', 'email');
  const eInput = document.createElement('input');
  eInput.type = 'text';
  eInput.placeholder = 'Email';
  eInput.name = 'email';
  mailfield.appendChild(eInput);
  fieldsDiv.appendChild(mailfield);

  formComment.appendChild(fieldsDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'button';
  const postButton = document.createElement('button');
  postButton.type = 'button';
  postButton.setAttribute('onclick', 'validate()');
  const btnValue = document.createTextNode('Post Comment');
  postButton.appendChild(btnValue);
  buttonDiv.appendChild(postButton);
  formComment.appendChild(buttonDiv);

  commentFormDiv.appendChild(formComment);
  divPostContent.appendChild(commentFormDiv);
  // End of comments

  myPostDiv.appendChild(postTitle);
  myPostDiv.appendChild(subTitle);
  myPostDiv.appendChild(divPostContent);
  postSection.appendChild(myPostDiv);

  body.appendChild(postSection);

  sender = document.forms['comment-form']['name'];
  email = document.forms['comment-form']['email'];
  message = document.forms['comment-form']['message'];
  err = document.getElementById('error');
});

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/JSON,text/plain,*/*,',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const validate = function () {
  if (sender.value === '' || sender.value < 3) {
    err.innerHTML = 'Enter Your Name!';
  } else if (!email.value.match(mailPattern)) {
    err.innerHTML = 'Please Enter Valid Email!';
  } else if (message.value === '') {
    err.innerHTML = 'Please Enter Your Message!';
  } else {
    //Getting Current Date and time
    let date = new Date();

    postData(`http://develi-api.herokuapp.com/api/v1/articles/${id}/comments`, {
      comment: message.value,
      email: email.value,
      sender: sender.value,
    }).then((data) => {
      console.log(data);
      alert('Comment Sent!');
      location.reload();
    });
  }
};
