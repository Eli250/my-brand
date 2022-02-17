//Using fetch API

const getResources = async () => {
  const response = await fetch('https://develi-api.herokuapp.com/');

  if (response.status !== 200) throw new Error('Cannot fetch data.');

  const data = await response.json();
  return data;
};

getResources()
  .then((data) => console.log('Resolved: ', data))
  .catch((err) => console.log('Rejected: ', err.message));

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
};
postData('https://develi-api.herokuapp.com/api/v1/user/login', {
  email: 'admin@mybrand.org',
  password: '@Admin001',
}).then((data) => {
  console.log(data);
});
/*
  fetch('https://develi-api.herokuapp.com/')
    .then((res) => {
      console.log('Resolved: ', res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('Rejected: ', err);
    });
  */

const formData = new FormData();
formData.append('image', image);
formData.append('title', title);
formData.append('content', message);
let check = fetch('https://atlp-backend-brand.herokuapp.com/api/v1/aritcles', {
  method: 'POST',
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGI2N2FiOThmMzhjZjljZjJhZWQ1YiIsImlhdCI6MTY0NDkxNDYyMywiZXhwIjoxNjQ1NTE5NDIzfQ.3AMt6sCC5z6NEj--NIfnU7IDJG8vUjWJDhyakSFe-jY',
  },
  body: formData,
})
  .then((res) => res.json())
  .then((data) => console.log(data));
if (check) {
  alert('created well');
  window.location.href = 'index.html';
} else {
  alert('not created');
}
