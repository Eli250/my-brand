'use strict';

//Without jQuery
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
