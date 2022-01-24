let user = JSON.parse(localStorage.getItem('userCredential'));
if (!user.isLoggedIn) {
  location.assign('/UI/admin/signin.html');
}
