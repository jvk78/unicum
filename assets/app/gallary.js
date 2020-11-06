'use strict';

var clsSlider = document.getElementById('cls_slider');
var prevSlideBtn = document.getElementById('prev_slide');
var countSlide = document.getElementById('countSlide');
var nextSlideBtn = document.getElementById('next_slide');
var slider = document.getElementById('slider');
var gallaryWrapper = document.getElementById('gallary_wrapper');
var sliderWrapper = document.getElementById('sliders_wrapper');

var slidesContainer = document.createElement('div');
slidesContainer.classList.add('slides__container');
var gallaryHTML = '',
    sliderHTML = '',
    slideLenght = GALLARY.length,
    slideOffset = 0,
    play = false,
    slidesize = void 0,
    cloneSlide = void 0,
    slideCount = void 0,
    offset = void 0,
    slide = void 0,
    autoPlay = void 0;

GALLARY.forEach(function (item) {
  gallaryHTML += '\n  <div class="' + item.class + '">\n    <img class="' + item.content + '" src="' + (imgURL + item.imgName) + '" alt="' + item.imgName + '">\n  </div>\n';
});
clsSlider.addEventListener('click', function () {
  slider.style.display = 'none';
  body.classList.remove('hide__overflow');

  var removeSlades = document.querySelectorAll('.silde__img');
  removeSlades.forEach(function (item) {
    item.remove();
  });
  slidesContainer.remove();
  slideOffset = 0;
  offset = 0;
});
gallaryWrapper.innerHTML = gallaryHTML;

var gallaryImages = document.querySelectorAll('.gallary__images');
var images = document.querySelectorAll('.gallary__image');

gallaryImages.forEach(function (item, index) {
  item.addEventListener('click', function () {
    body.classList.add('hide__overflow');

    sliderWrapper.append(slidesContainer);
    slider.style.display = 'flex';
    slideCount = index;
    createSlide(slideCount, slideOffset);
    slidesContainer.append(slide);
  });
});

function counterSlide(count, total) {
  countSlide.textContent = count + 1 + ' | ' + total;
}

var createSlide = function createSlide(slideCount, slideOffset) {
  slidesize = sliderWrapper.getBoundingClientRect().width;
  slide = document.createElement('img');
  slide.classList.add('silde__img');
  slide.style.left = slidesize * slideOffset + 'px';
  slide.src = images[slideCount].src;
  slidesContainer.append(slide);
  counterSlide(slideCount, images.length);
};
var next = function next() {
  if (slideCount >= images.length - 1) {
    slideCount = 0;
  } else {
    slideCount++;
  }
  offset = 0;
  createSlide(slideCount, 1);
  cloneSlide = document.querySelectorAll('.silde__img');
  setTimeout(function () {
    for (var i = 0; i <= cloneSlide.length - 1; i++) {
      //  console.log('i = ' + i)
      cloneSlide[i].style.left = slidesize * offset - slidesize + 'px';
      offset++;
    }
    nextSlideBtn.disabled = true;
    prevSlideBtn.disabled = true;
    cloneSlide[0].addEventListener('transitionend', function () {
      cloneSlide[0].remove();
      if (!play) {
        nextSlideBtn.disabled = false;
        prevSlideBtn.disabled = false;
      }
    });
  }, 0);
};

var prev = function prev() {
  if (slideCount <= 0) {
    slideCount = images.length - 1;
  } else {
    slideCount--;
  }
  offset = 1;
  createSlide(slideCount, -1);
  cloneSlide = document.querySelectorAll('.silde__img');
  setTimeout(function () {
    for (var i = 0; i <= cloneSlide.length - 1; i++) {
      cloneSlide[i].style.left = slidesize * offset + 'px';
      offset--;
    }
    nextSlideBtn.disabled = true;
    prevSlideBtn.disabled = true;
    cloneSlide[0].addEventListener('transitionend', function () {
      cloneSlide[0].remove();
      nextSlideBtn.disabled = false;
      prevSlideBtn.disabled = false;
    });
  }, 0);
};

nextSlideBtn.addEventListener('click', next);
prevSlideBtn.addEventListener('click', prev);