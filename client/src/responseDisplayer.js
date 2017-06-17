'use strict'

import {analyzis, analyzisWrapper, errorWrapper, error, canvas, ctx} from './domElement.js'

function isErrorInApi (data) {
  return data.message !== undefined
}

function showAnalyzis (data) {
  analyzisWrapper.style.display = 'block'
  errorWrapper.style.display = 'none'
  analyzis.innerHTML = ''
  Object.keys(data).forEach((face) => {
    analyzis.innerHTML +=
    'face: ' + face + '\n' +
    'gender: ' + data[face].Gender.Value + '\n' +
    'ageRange: ' + data[face].AgeRange.Low + ' - ' + data[face].AgeRange.High + '\n' +
    '---------------------' + '\n'
  })
}

function showFaces (data) {
  const boundingBox = {
    'x': 0,
    'y': 0,
    'width': 0,
    'height': 0
  }
  Object.keys(data).forEach((face) => {
    boundingBox.x = data[face].BoundingBox.Left * canvas.width
    boundingBox.y = data[face].BoundingBox.Top * canvas.height
    boundingBox.width = data[face].BoundingBox.Width * canvas.width
    boundingBox.height = data[face].BoundingBox.Height * canvas.height
    ctx.font = '15px Arial'
    ctx.fillStyle = 'green'
    ctx.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height)
    ctx.fillText(face, boundingBox.x, boundingBox.y - 5)
    ctx.strokeStyle = 'green'
    ctx.stroke()
  })
}

function showError (data) {
  errorWrapper.style.display = 'block'
  analyzisWrapper.style.display = 'none'
  error.innerHTML = data.message
}

export function showResponse (data) {
  const response = data
  const error = isErrorInApi(response)
  if (!error) {
    if (data.noface) {
      analyzis.innerHTML = data.noface
    }
    else {
      showAnalyzis(response)
      showFaces(response)
    }
  }
  else {
    showError(response)
  }
}
