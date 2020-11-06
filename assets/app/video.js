'use strict';

var video = document.getElementById('video');
var videoWrapper = document.getElementById('videoWrapper');
var clsVideo = document.getElementById('clsVideo');
var videoPoster = document.getElementById('videoPoster');
var videoToolbar = document.getElementById('videoToolbar');
var videoPlayer = document.getElementById('videoPlayer');
var videoProgress = document.getElementById('videoProgress');
var timePassed = document.getElementById('timePassed');
var timeTotal = document.getElementById('timeTotal');
var prevBtn = document.getElementById('prevBtn');
var backwardBtn = document.getElementById('backwardBtn');
var playPauseBtn = document.getElementById('playPauseBtn');
var stopBtn = document.getElementById('stopBtn');
var forwardBtn = document.getElementById('forwardBtn');
var nextBtn = document.getElementById('nextBtn');
var fullScreenBtn = document.getElementById('fullScreenBtn');
var currentTime = 0;
var duration = void 0,
    noActiveDelay = 5,
    nowNoActiv = void 0,
    updateInterval = void 0,
    delayInterval = void 0,
    updateDelay = void 0,
    delay = void 0,
    update = void 0,
    addNull = void 0,
    value = void 0,
    videoItem = void 0,
    videoItems = [];

for (var i = 0; i < GALLARY.length; i++) {
  if (GALLARY[i]['videoName']) {
    videoItems.push(GALLARY[i]);
  }
}

var gallaryVideo = document.querySelectorAll('.gallary__videos');

gallaryVideo.forEach(function (item, index) {
  item.addEventListener('click', function () {
    body.classList.add('hide__overflow');
    videoItem = index;
    video.style.display = 'flex';
    videoPoster.src = imgURL + videoItems[videoItem].imgName;
    videoPlayer.src = videoURL + videoItems[videoItem].videoName;
    videoPoster.style.opacity = 1;
    stopBtn.disabled = true;
    playPauseBtn.classList.remove('pause');
    playVideo();
    pauseRadio();
  });
});
function pauseRadio() {
  if (!audio.paused) {
    checkRadio = true;
    audio.pause();
    trackAction.classList.toggle('pause');
  } else {
    checkRadio = false;
  }
}

clsVideo.addEventListener('click', function () {
  stopVideo();
  video.style.display = 'none';
  body.classList.remove('hide__overflow');
  if (checkRadio) {
    playRadio();
  }
});

videoPlayer.volume = 0.3;
var addZero = function addZero(addNull) {
  return addNull < 10 ? '0' + addNull : addNull;
};

videoPlayer.addEventListener('play', function () {
  playPauseBtn.classList.add('pause');
  videoPoster.style.opacity = 0;
});

videoPlayer.addEventListener('pause', function () {
  return playPauseBtn.classList.remove('pause');
});

/* Hide Tools */
hideTools();
function hideTools() {
  nowNoActiv = 0;
  delay = setInterval('nowNoActiv++', 1000);
  update = setInterval('updateDelay()', 1000);

  function resetnowNoActiv() {
    clsVideo.style.opacity = 1;
    videoToolbar.classList.remove('hide__toolbar');
    nowNoActiv = 0;
  }

  updateDelay = function updateDelay() {
    if (nowNoActiv >= noActiveDelay) {
      nowNoActiv = 0;
      clsVideo.style.opacity = 0;
      videoToolbar.classList.add('hide__toolbar');
      return;
    }
  };
  window.onclick = resetnowNoActiv;
  window.onmousemove = resetnowNoActiv;
  window.ontouchstart = resetnowNoActiv;
  window.ontouchmove = resetnowNoActiv;
}
/*=================================*/

playPauseBtn.addEventListener('click', function () {
  playVideo();
});
stopBtn.addEventListener('click', function () {
  stopVideo();
});

var playVideo = function playVideo() {
  videoPoster.style.opacity = 0;
  stopBtn.disabled = false;
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
};

var stopVideo = function stopVideo() {
  videoPoster.style.opacity = 1;
  videoPlayer.pause();
  playPauseBtn.classList.remove('pause');

  videoPlayer.currentTime = 0;
  stopBtn.disabled = true;
};

prevBtn.addEventListener('click', function () {
  videoItem === 0 ? videoItem = gallaryVideo.length - 1 : videoItem = videoItem - 1;
  videoPoster.src = imgURL + videoItems[videoItem].imgName;
  videoPlayer.src = videoURL + videoItems[videoItem].videoName;
  playVideo();
});

nextBtn.addEventListener('click', function () {
  videoItem === gallaryVideo.length - 1 ? videoItem = 0 : videoItem = videoItem + 1;
  videoPoster.src = imgURL + videoItems[videoItem].imgName;
  videoPlayer.src = videoURL + videoItems[videoItem].videoName;
  playVideo();
});

forwardBtn.addEventListener('click', function () {
  videoPoster.style.opacity = 0;
  videoPlayer.currentTime += 10;
});

backwardBtn.addEventListener('click', function () {
  if (currentTime > 10) {
    videoPoster.style.opacity = 0;
    videoPlayer.currentTime -= 10;
  } else {
    stopVideo();
  }
});

fullScreenBtn.addEventListener('click', toogleFullsreen);
function toogleFullsreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
      videoPlayer.msRequestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
      videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }
  if (window.exitFullscreen) {
    window.exitFullscreen();
  } else if (window.msExitFullscreen) {
    window.msExitFullscreen();
  } else if (window.mozCancelFullScreen) {
    window.mozCancelFullScreen();
  } else if (window.webkitExitFullscreen) {
    window.webkitExitFullscreen();
  }
  videoPlayer.play();
}

videoPlayer.addEventListener('timeupdate', updateTime);
function updateTime() {
  duration = videoPlayer.duration;
  currentTime = videoPlayer.currentTime;
  videoProgress.value = currentTime / duration * 100;
  var minutePasset = Math.floor(currentTime / 60);
  var secondPasset = Math.floor(currentTime % 60);
  var minuteTotal = Math.floor(duration / 60);
  var secondTotal = Math.floor(duration % 60);
  timePassed.textContent = addZero(minutePasset) + ':' + addZero(secondPasset);
  timeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondTotal);
  if (currentTime >= duration) {
    stopVideo();
    clsVideo.style.opacity = 1;
    videoToolbar.classList.remove('hide__toolbar');
  }
}

videoProgress.addEventListener('input', function () {
  duration = videoPlayer.duration;
  value = videoProgress.value;
  if (value > 0) {
    videoPoster.style.opacity = 0;
  } else {
    videoPoster.style.opacity = 1;
  }
  videoPlayer.currentTime = value * duration / 100;
});