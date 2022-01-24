let userCredential = {};
let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let verifyStoredUser = [];
if (window.localStorage.getItem('Posts') === null) {
  window.localStorage.setItem('Posts', JSON.stringify(verifyStoredUser));
}
verifyStoredUser = window.localStorage.getItem('userCredential');

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
