const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/JSON,text/plain,*/*,',
      'Content-type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
};
let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let pieSpinner = document.querySelector('.lds-dual-ring');
async function login() {
  pieSpinner.style.display = 'inline-block';
  let email = document.forms['myForm']['uname'].value;
  let password = document.forms['myForm']['passwd'].value;
  let err = document.querySelector('#warning');

  const user = {
    email: email,
    password: password,
  };
  await postData(
    'https://develi-api.herokuapp.com/api/v1/user/login',
    user
  ).then((data) => {
    if (data.message === 'Successfully Logged In!') {
      window.localStorage.setItem(
        'AccessToken',
        JSON.stringify(data.accessToken)
      );
      window.location.href = '../admin/dashboard.html';
    } else {
      err.innerHTML = data.message;
    }
    pieSpinner.style.display = 'none';
  });
}
