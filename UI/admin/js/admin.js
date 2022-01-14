let userCredential = {};
function login() {
  var username = document.forms['myForm']['uname'].value;
  var password = document.forms['myForm']['passwd'].value;

  let verifyStoredUser = window.localStorage.getItem('userCredential');

  if (verifyStoredUser == null) {
    userCredential = {
      username: username,
      password: password,
      isLoggedIn: true,
    };
    verifyStoredUser = window.localStorage;
    verifyStoredUser.setItem('userCredential', JSON.stringify(userCredential));
    window.location.href = '../admin/dashboard.html';
  } else {
    let userStr = window.localStorage.getItem('userCredential');
    let user = JSON.parse(userStr);

    if (user.username === username && user.password === password) {
      console.log('User Authenticated!');
      window.location.href = '../admin/dashboard.html';
      user.isLoggedIn = true;
      window.localStorage.setItem('userCredential', JSON.stringify(user));
    } else {
      alert('Invalid username and/or password');
    }
  }
}
function logout() {
  let user = window.localStorage.getItem('userCredential');
  user = JSON.parse(user);
  user.isLoggedIn = false;
  window.localStorage.setItem('userCredential', JSON.stringify(user));
}
