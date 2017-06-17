'use strict'

function evaluateResult (isShow, dom) {
  if (isShow) {
    dom.style.display = 'block'
  }
  else {
    dom.style.display = 'none'
  }
}

export function evaluateEnviroment (result) {
  const isEnviromentFailed = result.checksPassed !== true
  evaluateResult(isEnviromentFailed, document.querySelector('.non-capable'))
}

export function handleSuccess (stream) {
  evaluateResult(true, document.querySelector('.camera-allowed'))
  window.stream = stream // make stream available to browser console
  document.querySelector('video').srcObject = stream
}

function userNotAllowedCamera (error) {
  const isNotAllowed = error.name.length > 0
  evaluateResult(isNotAllowed, document.querySelector('.camera-denied'))
}

export function handleError (error) {
  console.log('navigator.getUserMedia error: ', error)
  userNotAllowedCamera(error)
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
