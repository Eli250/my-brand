'use strict';

//The following line of codes deal with html ans CSS
document.addEventListener('DOMContentLoaded', function (event) {
  window.onscroll = function () {
    if (window.scrollY > 20) {
      document.querySelector('.navbar').classList.add('sticky');
    } else {
      document.querySelector('.navbar').classList.remove('sticky');
    }
    if (window.scrollY > 500) {
      document.querySelector('.scroll-up-btn').classList.add('show');
    } else {
      document.querySelector('.scroll-up-btn').classList.remove('show');
    }
  };
  // slide-up script
  document
    .querySelector('.scroll-up-btn')
    .addEventListener('click', function () {
      document.body.scrollTop = 0; //For Safari
      document.documentElement.scrollTop = 0; // Chrome, ...
    });

  // Script for burger button
  document.querySelector('.menu-btn').addEventListener(
    'click',
    function () {
      document.querySelector('.navbar .menu').classList.toggle('active');
      document.querySelector('.menu-btn i').classList.toggle('active');
    },
    false
  );
});

//Displaying Articles on Home
const token = JSON.parse(localStorage.getItem('AccessToken'));
const signBtn = document.querySelector('#signinHome');

if (token) {
  signBtn.innerHTML = 'Administrator';
  signBtn.href = 'UI/admin/dashboard.html';
}
const getResources = async () => {
  const response = await fetch(
    'https://develi-api.herokuapp.com/api/v1/articles'
  );

  if (response.status !== 200) throw new Error('Cannot fetch data.');

  const data = await response.json();
  return data;
};

function getPosts() {
  let post = localStorage.getItem('Posts');
  if (post === null || post.length === 0) {
    return [];
  }
  return JSON.parse(post);
}
let pieSpinner = document.querySelector('.lds-dual-ring');
async function displayPosts() {
  let blogContainerDiv = document.querySelector('.blog-container');

  pieSpinner.style.display = 'inline-block';

  await getResources()
    .then((data) => {
      data.data.forEach((post) => {
        const blogBoxDiv = document.createElement('div');
        blogBoxDiv.className = 'blog-box';
        blogBoxDiv.id = post._id;
        let blogImageDiv = document.createElement('div');
        blogImageDiv.className = 'blog-img';

        const blogImage = document.createElement('img');
        blogImage.src = post.image;
        blogImageDiv.appendChild(blogImage);
        blogBoxDiv.appendChild(blogImageDiv);
        blogContainerDiv.appendChild(blogBoxDiv);

        const blogtextDiv = document.createElement('div');
        blogtextDiv.className = 'blog-text';
        const blogSpan = document.createElement('span');
        const spantext = document.createTextNode(post.created_on);
        blogSpan.appendChild(spantext);
        blogtextDiv.appendChild(blogSpan);

        blogContainerDiv.appendChild(blogtextDiv);

        const blogTitleDiv = document.createElement('div');
        blogTitleDiv.className = 'blog-title';
        let title = document.createTextNode(post.title);
        blogTitleDiv.appendChild(title);
        blogtextDiv.appendChild(blogTitleDiv);
        blogBoxDiv.appendChild(blogtextDiv);

        const blogPara = document.createElement('p');
        let content = document.createTextNode(post.content);
        blogPara.appendChild(content);
        blogtextDiv.appendChild(blogPara);
        blogBoxDiv.appendChild(blogtextDiv);

        const actionBtnDiv = document.createElement('div');
        actionBtnDiv.className = 'action-btn';
        let readMoreLink = document.createElement('a');
        readMoreLink.href = `UI/articles/articles.html#${post._id}`;
        let linkValue = document.createTextNode('Read More');
        readMoreLink.appendChild(linkValue);

        blogtextDiv.appendChild(readMoreLink);
        blogBoxDiv.appendChild(blogtextDiv);

        pieSpinner.style.display = 'none';
      });
    })
    .catch((err) => console.log('Rejected: ', err.message));
}
displayPosts();
