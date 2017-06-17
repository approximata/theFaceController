'use strict'

export function detectEnviroment (cb) {
  if (Realeyesit !== undefined) {
    Realeyesit.EnvironmentalDetectionAPI.start(cb)
  }
  else {
    console.log('Error: Realeyesit.EnvironmentalDetectionAPI unavaiable')
  }
}

export function showMedia (constraints, handleSuccess, handleError) {
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError)
}
