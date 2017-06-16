'use strict'

export function enviromentDetection (cb) {
  Realeyesit.EnvironmentalDetectionAPI.start(cb)
}

export function mediaShow () {
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError)
}
