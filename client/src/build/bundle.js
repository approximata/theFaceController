(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var constraints = exports.constraints = {
  audio: false,
  video: true
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataURItoBlob = dataURItoBlob;
function dataURItoBlob(dataURI) {
  console.log('start');
  console.log(dataURI);
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var video = exports.video = document.querySelector('video');
var canvas = exports.canvas = window.canvas = document.querySelector('canvas');
var ctx = exports.ctx = canvas.getContext('2d');

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluateEnviroment = evaluateEnviroment;
exports.handleSuccess = handleSuccess;
exports.handleError = handleError;
function evaluateResult(isShow, dom) {
  if (isShow) {
    dom.style.display = 'block';
  } else {
    dom.style.display = 'none';
  }
}

function evaluateEnviroment(result) {
  var isEnviromentFailed = result.checksPassed !== true;
  evaluateResult(isEnviromentFailed, document.querySelector('.non-capable'));
}

function handleSuccess(stream) {
  evaluateResult(true, document.querySelector('.camera-allowed'));
  window.stream = stream; // make stream available to browser console
  document.querySelector('video').srcObject = stream;
}

function userNotAllowedCamera(error) {
  var isNotAllowed = error.name.length > 0;
  evaluateResult(isNotAllowed, document.querySelector('.camera-denied'));
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
  userNotAllowedCamera(error);
}

// function isErrorInApi (data) {
//   return data.message > 0
// }
//
// function showAnalyzisOrError (data) {
//   if (!isErrorInApi(data)) {
//     style.setProperty(`--analyzis-display`, 'block');
//     style.setProperty(`--error-display`, 'none');
//   }
//   else {
//     style.setProperty(`--analyzis-display`, 'none');
//     style.setProperty(`--error-display`, 'block');
//   }
// }

},{}],5:[function(require,module,exports){
'use strict';

var _setupEnviroment = require('./setupEnviroment.js');

var _evaluator = require('./evaluator.js');

var _config = require('./config.js');

var _photoCreator = require('./photoCreator.js');

var _converter = require('./converter.js');

// import {video} from './domElement.js'
var canvas = window.canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var button = document.querySelector('button');
var analyzis = document.querySelector('.analyzis');

(0, _setupEnviroment.detectEnviroment)(_evaluator.evaluateEnviroment);
(0, _setupEnviroment.showMedia)(_config.constraints, _evaluator.handleSuccess, _evaluator.handleError);
console.log(canvas);

button.onclick = function () {
  (0, _photoCreator.takeSnapshout)();
  var img = (0, _photoCreator.createImg)();
  (0, _converter.dataURItoBlob)(img);
};

},{"./config.js":1,"./converter.js":2,"./evaluator.js":4,"./photoCreator.js":6,"./setupEnviroment.js":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeSnapshout = takeSnapshout;
exports.createImg = createImg;

var _domElement = require('./domElement.js');

function takeSnapshout() {
  _domElement.canvas.width = _domElement.video.videoWidth * (_domElement.video.height / _domElement.video.videoHeight);
  _domElement.canvas.height = _domElement.video.height;
  _domElement.ctx.drawImage(_domElement.video, 0, 0, _domElement.canvas.width, _domElement.canvas.height);
}

function createImg() {
  return _domElement.canvas.toDataURL('image/jpeg', 1.0);
}

},{"./domElement.js":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectEnviroment = detectEnviroment;
exports.showMedia = showMedia;
function detectEnviroment(cb) {
  if (Realeyesit !== undefined) {
    Realeyesit.EnvironmentalDetectionAPI.start(cb);
  } else {
    console.log('Error: Realeyesit.EnvironmentalDetectionAPI unavaiable');
  }
}

function showMedia(constraints, handleSuccess, handleError) {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

},{}]},{},[5]);
