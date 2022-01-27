const id = location.hash.split('').slice(1, location.hash.length).join('');
let postList = localStorage.getItem('Posts');
console.log(postList);
postList = JSON.parse(postList);

const postData = postList.filter((item) => {
  return item.ID === id;
});

function getComments() {
  let comment = localStorage.getItem('Comments');
  if (comment === null || post.length === 0) {
    return [];
  }
  return JSON.parse(comment);
}

postData.forEach((post) => {
  const body = document.querySelector('body');
  const postSection = document.createElement('section');
  postSection.classList.add('post');

  const myPostDiv = document.createElement('div');
  myPostDiv.classList.add('max-width');

  const postTitle = document.createElement('h2');
  postTitle.classList.add('title');
  const titleContent = document.createTextNode(post.title);
  postTitle.appendChild(titleContent);
  const subTitle = document.createElement('h4');
  subTitle.classList.add('sub-title');
  const postOwner = document.createTextNode(post.postOwner);
  subTitle.appendChild(postOwner);
  const pSpan = document.createElement('span');
  const pDate = document.createTextNode(` | ${post.datePosted} |`);
  pSpan.appendChild(pDate);
  subTitle.appendChild(pSpan);

  const divPostContent = document.createElement('div');
  divPostContent.classList.add('post-content');

  const divPostImg = document.createElement('div');
  divPostImg.className = 'post-img';
  const img = document.createElement('img');
  img.src = post.image;
  divPostImg.appendChild(img);
  divPostContent.appendChild(divPostImg);

  const descDiv = document.createElement('div');
  descDiv.id = 'description';
  const descH5 = document.createElement('h5');
  const descContent = document.createTextNode(post.description);
  descH5.appendChild(descContent);
  descDiv.appendChild(descH5);
  divPostContent.appendChild(descDiv);

  const postDetailDiv = document.createElement('div');
  postDetailDiv.className = 'post-details';
  const p = document.createElement('p');
  const pContent = document.createTextNode(post.content);
  p.appendChild(pContent);
  postDetailDiv.appendChild(p);
  divPostContent.appendChild(postDetailDiv);

  const lineDiv = document.createElement('div');
  lineDiv.className = 'line';
  divPostContent.appendChild(lineDiv);

  //Display Comments

  const commentsDiv = document.createElement('div');
  commentsDiv.classList.add('column', 'left');

  allComments = getComments();

  const comments = allComments.filter((item) => {
    return (item.PostId = id);
  });
  const commentHeaderDiv = document.createElement('div');
  commentHeaderDiv.className = 'comment-header';
  let span = document.createElement('span');
  let spanContent = document.createTextNode(comments.length);
  span.appendChild(spanContent);
  commentHeaderDiv.appendChild(span);
  let commentHeader = document.createTextNode(' Comments');
  commentHeaderDiv.appendChild(commentHeader);
  commentsDiv.appendChild(commentHeaderDiv);
  comments.forEach((comment) => {
    let cDiv = document.createElement('div');
    cDiv.className = 'comments';
    let para = document.createElement('p');
    let pComment = document.createTextNode(comment.Comment);
    para.appendChild(pComment);
    cDiv.appendChild(para);
    commentsDiv.appendChild(cDiv);

    const commentOwnerDiv = document.createElement('div');
    commentOwnerDiv.className = 'comment-owner';
    let sender = document.createTextNode(comment.Sender);
    commentOwnerDiv.appendChild(sender);
    let cOwnerSpan = document.createElement('span');
    let date = document.createTextNode(' | ' + comment.Date);
    cOwnerSpan.appendChild(date);
    commentOwnerDiv.appendChild(cOwnerSpan);
    cDiv.appendChild(commentOwnerDiv);
    divPostContent.appendChild(commentsDiv);
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
});
console.log(post);

let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let sender = document.forms['comment-form']['name'];
let email = document.forms['comment-form']['email'];
let message = document.forms['comment-form']['message'];
let err = document.getElementById('error');

let comments = [];
if (window.localStorage.getItem('Comments') === null) {
  window.localStorage.setItem('Comments', JSON.stringify(comments));
}
comments = JSON.parse(localStorage.getItem('Comments'));

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

    let comment = {
      ID: comments.length + 1,
      Comment: message.value,
      Sender: sender.value,
      Email: email.value,
      Date: date,
      PostId: postData,
    };
    comments.push(comment);
    window.localStorage.setItem('Comments', JSON.stringify(comments));

    alert('Comment Sent!');
    location.reload();

    const stored = JSON.parse(localStorage.getItem('Comments'));
    console.log(stored);
  }
};
