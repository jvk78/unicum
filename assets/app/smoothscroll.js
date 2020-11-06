'use strict';

var section = document.querySelectorAll('section');
var sectionTitleWrapper = document.querySelector('.section__titles_wrapper');
var sectionTitles = document.querySelector('.section__titles');
var sectionTitle = document.querySelectorAll('.section__title');
var sectionAnchors = document.querySelectorAll('a[href^="#"]');
var headerHeight = void 0,
    sectionID = void 0,
    sectionPosition = void 0,
    scrollPosition = void 0,
    scrollValue = void 0,
    speedScroll = 30,
    activeSection = 0,
    activeTitle = void 0,
    sectionTitleHeight = void 0;

function showTitle() {
  if (section[1].getBoundingClientRect().top < window.innerHeight / 3) {
    sectionTitles.style.top = document.getElementById('header').clientHeight - 1 + 'px';
  } else {
    sectionTitles.style.top = '0px';
  }
}

function chsngeTitle() {
  sectionTitleHeight = sectionTitle[0].clientHeight;
  section.forEach(function (item, index) {
    if (item.getBoundingClientRect().top < window.innerHeight / 2 && item.getBoundingClientRect().top >= 0) {
      activeSection = index;
      activeTitle = activeSection - 1;
    }
    if (item.getBoundingClientRect().top < window.innerHeight / 1.9 && item.getBoundingClientRect().top > window.innerHeight / 2) {
      if (index > 0) {
        activeTitle = activeSection - 1;
        activeSection = index - 1;
      } else {
        activeSection = 0;
        activeTitle = 0;
      }
    }
  });

  sectionTitleWrapper.style.top = -sectionTitleHeight * activeTitle + 'px';
  for (var i = 0; i < sectionAnchors.length; i++) {
    sectionAnchors[i].classList.remove('activ__nav');
  }
  sectionAnchors[activeSection].classList.add('activ__nav');
}

window.onresize = function () {
  showTitle();
  chsngeTitle();
};

window.onscroll = function () {
  showTitle();
  chsngeTitle();
};

sectionAnchors.forEach(function (item, index) {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    headerHeight = document.getElementById('header').clientHeight;
    scrollPosition = window.pageYOffset;
    sectionID = item.getAttribute('href').substr(1);
    sectionPosition = document.getElementById(sectionID).getBoundingClientRect().top;
    scrollValue = Math.floor(sectionPosition + scrollPosition - headerHeight);
    scrollPosition > scrollValue ? scrollUp() : scrollDown();
  });
});

function scrollDown() {
  if (scrollPosition < scrollValue) {
    scrollPosition += speedScroll;
    window.scrollTo(0, scrollPosition);
    requestAnimationFrame(scrollDown);
  } else if (scrollPosition > scrollValue) {
    window.scrollTo(0, scrollValue);
    return;
  }
}
function scrollUp() {
  if (scrollPosition > scrollValue) {
    scrollPosition -= speedScroll;
    window.scrollTo(0, scrollPosition);
    requestAnimationFrame(scrollUp);
  } else if (scrollPosition < scrollValue) {
    window.scrollTo(0, scrollValue);
    return;
  }
}