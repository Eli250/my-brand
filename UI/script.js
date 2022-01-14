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

//These lines of codes deal with validating form data and manipulating them.

let sender = document.forms['contact-form']['name'].value;
let email = document.forms['contact-form']['email'].value;
let subj = document.forms['contact-form']['subject'].value;
let message = document.forms['contact-form']['message'].value;

let infoMessage = document.getElementById('info-message');
let senderObj = {};
const sendMessage = () => {
  if (validateContactInput()) {
    console.log('Please fill all fields!');
    setTimeout(function () {
      location.reload();
    }, 3000);
    return false;
  }
  senderObj = {
    sender: sender,
    email: email,
    subject: subj,
    message: message,
  };
  console.log(senderObj);

  console.log('Validation Passed!');

  let myStorage = window.localStorage;

  myStorage.setItem('senderObj', JSON.stringify(senderObj));
  return true;
};

const stringContainsNumber = function (str) {
  let pattern = str.match(/\d+/g);
  if (pattern != null) {
    return true;
  } else return false;
};
const validateContactInput = function () {
  let error = false;

  if (sender.length < 3) {
    const input = document.querySelector('input');
    infoMessage.innerHTML = 'Name should be at least 3 characters long.';
    error = true;
  } else if (stringContainsNumber(sender)) {
    infoMessage.innerHTML =
      'Invalid character in name! Remove numbers or symbols.';
    error = true;
  } else if (email === '') {
    infoMessage.innerHTML = 'Please enter a valid email!';
    error = true;
  } else if (subj.length < 5) {
    infoMessage.innerHTML = 'Subject should be at least 5 characters long.';
    error = true;
  } else if (message === '') {
    infoMessage.innerHTML = 'Please enter message!';
    error = true;
  } else {
    infoMessage.innerHTML = '';
  }
  return error;
};
