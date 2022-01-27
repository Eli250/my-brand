'use strict';
//These lines of codes deal with validating form data and manipulating them.
let exactLocation;
if (navigator.geolocation) {
  const SuccessfullLookup = (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude);
    console.log(longitude);
    let apiLocation = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f771ed1eb4474843aa7ddf98d865dc08`;
    console.log(apiLocation);
    fetch(apiLocation)
      .then((response) => response.json())
      .then((data) => {
        let resultsList = data.results;
        // console.log("Exactly location is:", resultsList[0].formatted);
        exactLocation = resultsList[0].formatted;
        // console.log(exaclyLocation);
      });
  };
  navigator.geolocation.getCurrentPosition(SuccessfullLookup);
}

const sendMessage = () => {
  let queries = [];
  if (window.localStorage.getItem('Queries') === null) {
    window.localStorage.setItem('Queries', JSON.stringify(queries));
  }
  queries = JSON.parse(localStorage.getItem('Queries'));

  const form = document.querySelector('#form-contact');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let sender = document.forms['contact-form']['name'].value;
    let email = document.forms['contact-form']['email'].value;
    let subj = document.forms['contact-form']['subject'].value;
    let message = document.forms['contact-form']['message'].value;

    let infoMessage = document.getElementById('info-message');

    if (sender.length < 3) {
      const input = document.querySelector('input');
      infoMessage.innerHTML = 'Name should be at least 3 characters long.';
      return;
    } else {
      infoMessage.innerHTML = '';
    }
    if (stringContainsNumber(sender)) {
      infoMessage.innerHTML =
        'Invalid character in name! Remove numbers or symbols.';
      return;
    } else {
      infoMessage.innerHTML = '';
    }
    if (email === '') {
      infoMessage.innerHTML = 'Please enter a valid email!';
      return;
    } else {
      infoMessage.innerHTML = '';
    }
    if (subj.length < 5) {
      infoMessage.innerHTML = 'Subject should be at least 5 characters long.';
      return;
    } else {
      infoMessage.innerHTML = '';
    }
    if (message === '') {
      infoMessage.innerHTML = 'Please enter message!';
      return;
    } else {
      infoMessage.innerHTML = '';
    }

    let query = {
      ID: uuidv4(),
      sender: sender,
      email: email,
      subject: subj,
      message: message,
      exactLocation,
      date: new Date(),
    };

    queries.push(query);
    window.localStorage.setItem('Queries', JSON.stringify(queries));

    alert('Query Sent Successfully!');
    location.reload();

    const stored = JSON.parse(localStorage.getItem('Queries'));
    console.log(stored);
  });
};

const stringContainsNumber = function (str) {
  let pattern = str.match(/\d+/g);
  if (pattern != null) {
    return true;
  } else return false;
};

sendMessage();
//Displaying Posts on Blog Page
