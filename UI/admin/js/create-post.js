let title = document.getElementById('tit');
let cont = document.getElementById('cont');
let file = document.getElementById('file');
let img = document.querySelector('#imgPreview');
let url;
let titErr = document.getElementById('tit-err');
let contErr = document.getElementById('cont-err');

try {
  file.addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      url = reader.result;
      img.setAttribute('src', url);
    });
    reader.readAsDataURL(this.files[0]);
  });
} catch (error) {}

const token = JSON.parse(localStorage.getItem('AccessToken'));

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return response.json();
};

let blogContainer = document.getElementById('blogContainer');

const postForm = document.querySelector('#post-form');
const id = location.hash.split('').slice(1, location.hash.length).join('');

const pBtn = document.getElementById('pBtn');

const getResources = async () => {
  const response = await fetch(
    `https://develi-api.herokuapp.com/api/v1/articles/${id}`
  );

  if (response.status !== 200) throw new Error('Cannot fetch data.');

  const data = await response.json();
  return data;
};

if (id.length !== 0) {
  getResources()
    .then((data) => {
      title.value = data.data.title;
      cont.value = data.data.content;
      img.setAttribute('src', data.data.image);
      pBtn.value = 'Update Post';
    })
    .catch((err) => console.log('Rejected: ', err.message));
}
const updateData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return response.json();
};

function createPost() {
  if (title.value === '' || title.value < 5) {
    titErr.innerText = 'Please enter a valid tittle';
  } else if (cont.value === '') {
    contErr.innerText = 'Plese Fill in the post content!';
  } else {
    let readFile = document.getElementById('file').files[0];
    const article = new FormData();
    article.append('title', title.value);
    article.append('content', cont.value);
    article.append('image', readFile);
    if (id.length === 0) {
      postData(
        'https://develi-api.herokuapp.com/api/v1/articles',
        article
      ).then((data) => {
        if (data.message === 'Article Created!') {
          window.location.href = '../admin/posts.html';
        } else {
          console.log(data);
          titErr.innerText = data.message;
        }
      });
    } else {
      console.log('Updating...');

      let readFile = document.getElementById('file').files[0];

      const updateArt = new FormData();
      updateArt.append('title', title.value);
      updateArt.append('content', cont.value);
      updateArt.append('image', readFile);
      updateData(
        `https://develi-api.herokuapp.com/api/v1/articles/${id}`,
        updateArt
      ).then((data) => {
        // console.log(data);
        if (data.message === 'Article Created!') {
          location.assign(`../admin/posts.html#${id}`);
        } else {
          alert(data.message);
        }
      });
    }
  }
}
