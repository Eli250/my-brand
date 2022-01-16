let userCredential = {};
let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function login() {
  var username = document.forms['myForm']['uname'].value;
  var password = document.forms['myForm']['passwd'].value;
  var err = document.querySelector('#warning');
  if (username === '' || username.length < 6) {
    err.innerText = 'Invalid User';
  } else if (!username.match(mailPattern)) {
    err.innerText = 'Username must be a valid email!';
  } else if (password === '' || password.length < 5) {
    err.innerText = 'Invalid Password!';
  } else {
    let verifyStoredUser = window.localStorage.getItem('userCredential');

    if (verifyStoredUser == null) {
      userCredential = {
        username: username,
        password: password,
        isLoggedIn: true,
      };
      verifyStoredUser = window.localStorage;
      verifyStoredUser.setItem(
        'userCredential',
        JSON.stringify(userCredential)
      );
      window.location.href = '../admin/dashboard.html';
    } else {
      let userStr = window.localStorage.getItem('userCredential');
      let user = JSON.parse(userStr);

      if (user.username === username && user.password === password) {
        console.log('User Authenticated!');
        window.location.href = '../admin/dashboard.html';
        user.isLoggedIn = true;
        window.localStorage.setItem('userCredential', JSON.stringify(user));
      }
    }
  }
}
function logout() {
  let user = window.localStorage.getItem('userCredential');
  user = JSON.parse(user);
  user.isLoggedIn = false;
  window.localStorage.setItem('userCredential', JSON.stringify(user));
}
let title = document.getElementById('tit');
let desc = document.getElementById('desc');
let cont = document.getElementById('cont');
let file = document.getElementById('file');
let img = document.querySelector('#imgPreview');
let url;
let titErr = document.getElementById('tit-err');
let descErr = document.getElementById('desc-err');
let contErr = document.getElementById('cont-err');

file.addEventListener('change', function () {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    url = reader.result;
    img.setAttribute('src', url);
  });
  reader.readAsDataURL(this.files[0]);
});

function createPost() {
  if (title.value === '' || title.value < 5) {
    titErr.innerText = 'Please enter a valid tittle';
  } else if (desc.value === '' || desc.value < 10) {
    descErr.innerText = 'Enter Description of the post!';
  } else if (cont.value === '') {
    contErr.innerText = 'Plese Fill in the post content!';
  } else {
    let postedOn = Date();
    let post = [
      {
        title: title.value,
        description: desc.value,
        content: cont.value,
        image: url,
        datePosted: postedOn,
      },
    ];
    localStorage.setItem('Posts', JSON.stringify(post));
    const stored = JSON.parse(localStorage.getItem('Posts'));
    console.log(stored[0]);

    window.location.href = '../admin/posts.html';
  }
}
