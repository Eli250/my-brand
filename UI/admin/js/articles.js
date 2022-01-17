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

// Display Post Content

function getPost(id) {
  let posts = JSON.parse(localStorage.getItem('Posts'));
  if (posts === null || posts.length === 0) {
    return [];
  }
  let post = posts.find((obj) => {
    return obj.ID === id;
  });
  return post;
}

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
function displayPosts(postId) {
  const post = getPost(postId);

  const postSection = document.querySelector('#post');
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

  myPostDiv.appendChild(postTitle);
  myPostDiv.appendChild(subTitle);
  myPostDiv.appendChild(divPostContent);
  myPostDiv.appendChild(lineDiv);
  postSection.appendChild(myPostDiv);
}
// displayPosts('post-3');
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
