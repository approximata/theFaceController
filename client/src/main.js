'use strict'

import {detectEnviroment, showMedia} from './setupEnviroment.js'
import {evaluateEnviroment, handleSuccess, handleError} from './evaluator.js'
import {constraints} from './config.js'
// import {video} from './domElement.js'
import {takeSnapshout, createImg} from './photoCreator.js'
import {dataURItoBlob} from './converter.js'

const canvas = window.canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const button = document.querySelector('button')
const analyzis = document.querySelector('.analyzis')

detectEnviroment(evaluateEnviroment)
showMedia(constraints, handleSuccess, handleError)
console.log(canvas);

button.onclick = function () {
  takeSnapshout()
  const img = createImg()
  const blob = dataURItoBlob(img)
}
