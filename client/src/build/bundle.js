(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectionHandler = detectionHandler;
function detectionHandler(result) {
  console.log('checker invited');
  if (!result.checksPassed) {
    document.documentElement.style.setProperty('--non-capable-display', 'block');
  } else {
    console.log('passed');
    document.documentElement.style.setProperty('--non-capable-display', 'none');
  }
}

// function handleSuccess (stream) {
//   window.stream = stream // make stream available to browser console
//   video.srcObject = stream
// }
//
// function userNotAllowedCamera (error) {
//   if (error.name === 'NotAllowedError') {
//     style.setProperty(`--camera-denied-diplay`, 'block');
//   }
//   else {
//     style.setProperty(`--camera-denied-diplay`, 'none');
//   }
// }
//
// function handleError (error) {
//   console.log('navigator.getUserMedia error: ', error);
//   userNotAllowedCamera(error);
// }
//
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

},{}],2:[function(require,module,exports){
'use strict';

// console.log(Realeyesit.EnvironmentalDetectionAPI);

var _setupEnviroment = require('./setupEnviroment.js');

var _checkHandler = require('./checkHandler.js');

// var setupEnviroment =  require('./setupEnviroment.js')
// var checkHandler = require('./checkHandler.js')

var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var button = document.querySelector('button');
var analyzis = document.querySelector('.analyzis');
var constraints = {
  audio: false,
  video: true
};

console.log(_setupEnviroment.enviromentDetection);
(0, _setupEnviroment.enviromentDetection)(_checkHandler.detectionHandler);

},{"./checkHandler.js":1,"./setupEnviroment.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enviromentDetection = enviromentDetection;
exports.mediaShow = mediaShow;
function enviromentDetection(cb) {
  Realeyesit.EnvironmentalDetectionAPI.start(cb);
}

function mediaShow() {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

},{}]},{},[2]);
