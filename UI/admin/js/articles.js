'use strict';
// Script for burger button
document.querySelector('.menu-btn').addEventListener(
  'click',
  function () {
    document.querySelector('.navbar .menu').classList.toggle('active');
    document.querySelector('.menu-btn i').classList.toggle('active');
  },
  false
);
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
    };
    comments.push(comment);
    window.localStorage.setItem('Comments', JSON.stringify(comments));
    const stored = JSON.parse(localStorage.getItem('Comments'));
    console.log(stored);
  }
};
function getComments() {
  let comment = localStorage.getItem('Comments');
  if (comment === null || post.length === 0) {
    return [];
  }
  return JSON.parse(comment);
}
function displayComments() {
  let commentsDiv = document.querySelector('#comment-div');
  commentsDiv.classList.add('column', 'left');
  const comments = getComments();
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
    let cOwnerSpan = document.createElement('span');
    let sender = document.createTextNode(comment.Sender);
    commentOwnerDiv.appendChild(sender);
    let date = document.createTextNode(' | ' + comment.Date);
    cOwnerSpan.appendChild(date);
    commentOwnerDiv.appendChild(cOwnerSpan);
    cDiv.appendChild(commentOwnerDiv);
  });
  //   console.log(comments);
}
displayComments();
