'use strict';

// Detect Device
var body = document.querySelector('body');
var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
  appleOS: function appleOS() {
    return isMobile.iOS();
  }
};
if (isMobile.any()) {
  body.classList.add('mobile');
  if (isMobile.appleOS()) {
    body.classList.add('ios');
  } else {
    body.classList.add('all');
  }
} else {
  body.classList.add('desktop');
}

// Variables
var navBurger = document.getElementById('nav_burger');
var navItems = document.getElementById('nav_items');
var programmTitle = document.querySelectorAll('.programm__items_title');
var programmDiscript = document.querySelectorAll('.programm__content_disc');
var counter = void 0;

window.addEventListener('click', function (event) {
  var target = event.target;
  if (target !== navBurger) {
    navBurger.classList.remove('nav__burger_cls');
    navItems.classList.remove('list__show');
  }
  if (target !== radioNav && target !== radioSelector && target !== radioStantion && target !== trackContainer) {
    radioNav.classList.remove('list__show');
    radioSelector.classList.remove('select');
  }

  if (target !== rangeContainer && target !== radioVolume && target !== volumeOnOff && target !== volumeValue) {
    rangeContainer.classList.remove('list__show');
  }
});

// Show/Hide Programm Discription
programmTitle.forEach(function (item, index) {
  item.addEventListener('click', function (event) {
    if (document.documentElement.clientWidth <= 414) {
      for (counter = 0; counter < programmTitle.length; counter++) {
        if (counter !== index) {
          programmTitle[counter].classList.remove('select');
          programmDiscript[counter].classList.remove('show__item');
        }
      }
      item.classList.toggle('select');
      programmDiscript[index].classList.toggle('show__item');
    }
  });
});

// Burger Menu
navBurger.addEventListener('click', function () {
  this.classList.toggle('nav__burger_cls');
  navItems.classList.toggle('list__show');
  radioNav.classList.remove('list__show');
  rangeContainer.classList.remove('list__show');
  radioSelector.classList.remove('select');
});

//var fontSize = window.getComputedStyle(navText, null).getPropertyValue("font-size");
//