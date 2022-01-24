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
