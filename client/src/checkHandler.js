'use strict'

export function detectionHandler (result) {
  console.log('checker invited')
  if (!result.checksPassed) {
    document.documentElement.style.setProperty(`--non-capable-display`, 'block')
  }
  else {
    console.log('passed');
    document.documentElement.style.setProperty(`--non-capable-display`, 'none')
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
