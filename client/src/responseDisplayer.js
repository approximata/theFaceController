'use strict'

import {analyzis, analyzisWrapper, errorWrapper, error, canvas, ctx, enableButton} from './domElement.js'

function isErrorInApi (data) {
  const isError = data.message !== undefined
  return isError
}

function showAnalyzis (data) {
  analyzisWrapper.style.display = 'block'
  errorWrapper.style.display = 'none'
  analyzis.innerHTML = ''
  analyzis.innerHTML += 'Number of faces: ' + data.length + '\n' +
  '---------------------' + '\n'

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
    ctx.font = '15px tahoma'
    ctx.fillStyle = '#56BB68'
    ctx.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height)
    ctx.fillText('face: ' + face, boundingBox.x, boundingBox.y - 5)
    ctx.strokeStyle = '#56BB68'
    ctx.stroke()
  })
}

function showError (data) {
  errorWrapper.style.display = 'block'
  analyzisWrapper.style.display = 'none'
  error.innerHTML = data.message
}

function showNoFace (data) {
  analyzisWrapper.style.display = 'block'
  errorWrapper.style.display = 'none'
  analyzis.innerHTML = data.noface
}

export function showResponse (data) {
  const response = data
  const error = isErrorInApi(response)
  console.log(data);
  // console.log(response)

  if (!error) {
    console.log(data.noface);
    if (data.noface) {
      showNoFace(data)
    }
    else {
      showAnalyzis(response)
      showFaces(response)
    }
  }
  else {
    showError(response)
  }
  enableButton()
}
