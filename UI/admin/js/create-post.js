let title = document.getElementById('tit');
let desc = document.getElementById('desc');
let cont = document.getElementById('cont');
let file = document.getElementById('file');
let img = document.querySelector('#imgPreview');
let url;
let titErr = document.getElementById('tit-err');
let descErr = document.getElementById('desc-err');
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

let posts = [];

if (window.localStorage.getItem('Posts') === null) {
  window.localStorage.setItem('Posts', JSON.stringify(posts));
}
posts = JSON.parse(localStorage.getItem('Posts'));

let blogContainer = document.getElementById('blogContainer');

const postForm = document.querySelector('#post-form');
const id = location.hash.split('').slice(1, location.hash.length).join('');

const pBtn = document.getElementById('pBtn');
const postUpdate = posts.filter((p) => p.ID === id);

if (id !== 0) {
  title.value = postUpdate[0].title;
  desc.value = postUpdate[0].description;
  cont.value = postUpdate[0].content;
  pBtn.value = 'Update Post';
}

function createPost() {
  if (title.value === '' || title.value < 5) {
    titErr.innerText = 'Please enter a valid tittle';
  } else if (desc.value === '' || desc.value < 10) {
    descErr.innerText = 'Enter Description of the post!';
  } else if (cont.value === '') {
    contErr.innerText = 'Plese Fill in the post content!';
  } else {
    if (id.length === 0) {
      let postedOn = Date();

      let post = {
        ID: `post-${posts.length + 1}`,
        title: title.value,
        description: desc.value,
        content: cont.value,
        image: url,
        datePosted: postedOn,
        postOwner: 'Eli Hirwa',
      };
      posts.push(post);
      localStorage.setItem('Posts', JSON.stringify(posts));
      const stored = JSON.parse(localStorage.getItem('Posts'));

      window.location.href = `../admin/posts.html`;
    } else {
      posts.forEach((p) => {
        if (p.ID === id) {
          p.title = title.value;
          p.description = desc.value;
          p.content = cont.value;
        }
      });
      localStorage.setItem('Posts', JSON.stringify(posts));
      alert('Post Updated!');
      console.log(posts);
      location.assign(`../admin/posts.html#${id}`);
    }
  }
}
