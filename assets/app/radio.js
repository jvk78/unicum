'use strict';

var jsonUrl = void 0,
    currentTrack = void 0,
    radioName = void 0,
    currentFunction = void 0,
    checkList = void 0,
    radioUrl = void 0,
    speedTrack = void 0,
    vol = void 0,
    checkRadio = void 0;
var speed = 5;
var radioTrack = document.getElementById('radio_track');
var radioStantion = document.getElementById('radio_stantion');
var radioNav = document.getElementById('radio_navigation');
var trackAction = document.getElementById('track_action');
var radioVolume = document.getElementById('radio_volume');
var radioSelect = document.getElementById('radio_select');
var radioSelector = document.getElementById('radio_selector');
var trackContainer = document.getElementById('track_container');
var rangeContainer = document.getElementById('range_container');
var volumeOnOff = document.getElementById('volume_on_off');
var volumeRange = document.getElementById('volume_range');
var volumeValue = document.getElementById('volume_value');
var radioListItems = document.querySelectorAll('.radio__stantion');

var audio = new Audio();
volumeRange.value = 0.25;
audio.type = 'audio/aac';
audio.volume = volumeRange.value;
volumeValue.textContent = volumeRange.value * 100;

radioNav.onclick = function () {
  this.classList.remove('list__show');
};

radioVolume.onclick = function () {
  rangeContainer.classList.toggle('list__show');
  radioSelector.classList.remove('select');
};

volumeOnOff.onclick = function () {
  this.classList.toggle('volume__activ');
  if (audio.volume > 0) {
    volumeRange.disabled = true;
    volumeRange.classList.add('volume__disable');
    audio.volume = 0;
  } else {
    volumeRange.disabled = false;
    volumeRange.classList.remove('volume__disable');
    audio.volume = volumeRange.value;
  }
};

volumeRange.addEventListener('input', function () {
  audio.volume = volumeRange.value;
  volumeValue.textContent = Math.floor(volumeRange.value * 100);
});

radioSelect.onclick = function () {
  radioSelector.classList.toggle('select');
  radioNav.classList.toggle('list__show');
  rangeContainer.classList.remove('list__show');
};

radioNav.addEventListener('change', function (event) {
  trackAction.disabled = false;
  trackAction.classList.add('play__activ');
  trackAction.classList.add('pause');
  radioSelector.classList.remove('select');
  radioListItems.forEach(function (item) {
    return item.classList.remove('radio__active');
  });
  var target = event.target;
  var activ = target.parentElement.querySelector('.radio__stantion');
  activ.classList.add('radio__active');
  var radioFunc = target.dataset.functionName;
  radioUrl = target.dataset.stantionUrl;
  radioName = target.dataset.stantionName;
  audio.src = radioUrl;
  audio.play();
  clearList();
  currentFunction = radioFunc;
  setTimeout(function () {
    startList();
  }, 100);
});

trackAction.onclick = playRadio;
function playRadio() {
  trackAction.classList.toggle('pause');
  if (audio.paused) {
    var timestamp = Math.floor(new Date().getTime() / 1000);
    audio.src = radioUrl;
    audio.play();
  } else {
    audio.pause();
  }
}

function kidHit() {
  fetch('https://scraper2.onlineradiobox.com/ru.deti').then(function (response) {
    return response.json();
  }).then(function (data) {
    currentTrack = data.title;
    if (!currentTrack) {
      currentTrack = 'Вы слушаете - ' + radioName;
    }
    trackList();
  }).catch(function (e) {
    currentTrack = 'Вы слушаете - ' + radioName;
    trackList();
  });
}

function radioDisney() {
  var timestamp = Math.floor(new Date().getTime() / 1000);
  fetch('https://metaserver.hostingradio.ru/disney.json?' + timestamp).then(function (response) {
    return response.json();
  }).then(function (data) {
    currentTrack = data.metadata;
    if (!currentTrack) {
      currentTrack = 'Вы слушаете - ' + radioName;
    }
    trackList();
  }).catch(function (e) {
    currentTrack = 'Вы слушаете - ' + radioName;
    trackList();
  });
}

function detiFM() {
  var timestamp = Math.floor(new Date().getTime() / 1000);
  fetch('https://101.ru/api/channel/getTrackOnAir/199/channel/download.json' + timestamp).then(function (response) {
    return response.json();
  }).then(function (data) {
    data.result.short.title !== 'Реклама' ? currentTrack = data.result.short.title : currentTrack = 'Вы слушаете - ' + radioName;
    if (!currentTrack) {
      currentTrack = 'Вы слушаете - ' + radioName;
    }
    trackList();
  }).catch(function (e) {
    currentTrack = 'Вы слушаете - ' + radioName;
    trackList();
  });
}

function trackList() {
  if (radioTrack.textContent != currentTrack) {
    radioStantion.style.top = '-5%';
    radioStantion.textContent = radioName;
    radioTrack.textContent = currentTrack;
    var trackWidth = radioTrack.clientWidth;
    var trackContainerWidth = trackContainer.clientWidth;
    if (trackWidth > trackContainerWidth) {
      speedTrack = speed * ((trackContainerWidth + (trackWidth - trackContainerWidth)) / trackContainerWidth);
    } else {
      speedTrack = speed;
    }
    radioTrack.style.animation = 'radiotrack ' + speedTrack + 's linear infinite';
  }
}

function startList() {
  checkList = setInterval(currentFunction, 5000);
}
function clearList() {
  clearInterval(checkList);
}