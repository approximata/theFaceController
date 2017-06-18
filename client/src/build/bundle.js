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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.connectApi = connectApi;
function connectApi(callback, blob) {
  var fd = new FormData();
  fd.append('blob', blob);

  fetch('/api/rekognition', {
    method: 'post',
    body: fd
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        response = _ref2[0],
        json = _ref2[1];

    if (response.status < 200 || response.status >= 300) {
      var error = new Error(json.message);
      error.response = response;
      throw error;
    }
    callback(json);
  }).catch(function (ex) {
    console.log('Unhandled Error! ', ex);
  });
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataURItoBlob = dataURItoBlob;
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableButton = disableButton;
exports.enableButton = enableButton;
var video = exports.video = document.querySelector('video');
var canvas = exports.canvas = window.canvas = document.querySelector('canvas');
var ctx = exports.ctx = canvas.getContext('2d');

var button = exports.button = document.querySelector('button');

var analyzisWrapper = exports.analyzisWrapper = document.querySelector('.analyzis-wrapper');
var analyzis = exports.analyzis = document.querySelector('.analyzis');

var errorWrapper = exports.errorWrapper = document.querySelector('.error-wrapper');
var error = exports.error = document.querySelector('.error');

function disableButton() {
  button.classList.add('disabled');
  button.disabled = true;
}

function enableButton() {
  button.classList.remove('disabled');
  button.disabled = false;
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluateResult = evaluateResult;
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

},{}],6:[function(require,module,exports){
'use strict';

var _setupEnviroment = require('./setupEnviroment.js');

var _evaluator = require('./evaluator.js');

var _config = require('./config.js');

var _photoCreator = require('./photoCreator.js');

var _converter = require('./converter.js');

var _responseDisplayer = require('./responseDisplayer.js');

var _connection = require('./connection.js');

var _domElement = require('./domElement.js');

(0, _setupEnviroment.detectEnviroment)(_evaluator.evaluateEnviroment);
(0, _setupEnviroment.showMedia)(_config.constraints, _evaluator.handleSuccess, _evaluator.handleError);

_domElement.button.onclick = function () {
  (0, _photoCreator.takeSnapshout)();
  var img = (0, _photoCreator.createImg)();
  var blob = (0, _converter.dataURItoBlob)(img);
  (0, _connection.connectApi)(_responseDisplayer.showResponse, blob);
  (0, _domElement.disableButton)();
};

},{"./config.js":1,"./connection.js":2,"./converter.js":3,"./domElement.js":4,"./evaluator.js":5,"./photoCreator.js":7,"./responseDisplayer.js":8,"./setupEnviroment.js":9}],7:[function(require,module,exports){
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

},{"./domElement.js":4}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showResponse = showResponse;

var _domElement = require('./domElement.js');

function isErrorInApi(data) {
  return data.message !== undefined;
}

function showAnalyzis(data) {
  _domElement.analyzisWrapper.style.display = 'block';
  _domElement.errorWrapper.style.display = 'none';
  _domElement.analyzis.innerHTML = '';
  _domElement.analyzis.innerHTML += 'Number of faces: ' + data.length + '\n' + '---------------------' + '\n';

  Object.keys(data).forEach(function (face) {
    _domElement.analyzis.innerHTML += 'face: ' + face + '\n' + 'gender: ' + data[face].Gender.Value + '\n' + 'ageRange: ' + data[face].AgeRange.Low + ' - ' + data[face].AgeRange.High + '\n' + '---------------------' + '\n';
  });
}

function showFaces(data) {
  var boundingBox = {
    'x': 0,
    'y': 0,
    'width': 0,
    'height': 0
  };
  Object.keys(data).forEach(function (face) {
    boundingBox.x = data[face].BoundingBox.Left * _domElement.canvas.width;
    boundingBox.y = data[face].BoundingBox.Top * _domElement.canvas.height;
    boundingBox.width = data[face].BoundingBox.Width * _domElement.canvas.width;
    boundingBox.height = data[face].BoundingBox.Height * _domElement.canvas.height;
    _domElement.ctx.font = '15px tahoma';
    _domElement.ctx.fillStyle = '#56BB68';
    _domElement.ctx.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
    _domElement.ctx.fillText('face: ' + face, boundingBox.x, boundingBox.y - 5);
    _domElement.ctx.strokeStyle = '#56BB68';
    _domElement.ctx.stroke();
  });
}

function showError(data) {
  _domElement.errorWrapper.style.display = 'block';
  _domElement.analyzisWrapper.style.display = 'none';
  _domElement.error.innerHTML = data.message;
}

function activateButtom() {
  _domElement.button.disabled = false;
}

function showResponse(data) {
  var response = data;
  var error = isErrorInApi(response);
  if (!error) {
    if (data.noface) {
      _domElement.analyzis.innerHTML = data.noface;
    } else {
      showAnalyzis(response);
      showFaces(response);
    }
  } else {
    showError(response);
  }
  (0, _domElement.enableButton)();
}

},{"./domElement.js":4}],9:[function(require,module,exports){
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

},{}]},{},[6]);
