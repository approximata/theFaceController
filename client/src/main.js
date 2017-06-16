'use strict'

// console.log(Realeyesit.EnvironmentalDetectionAPI);

import {enviromentDetection} from './setupEnviroment.js'
import {detectionHandler} from './checkHandler.js'
// var setupEnviroment =  require('./setupEnviroment.js')
// var checkHandler = require('./checkHandler.js')

const video = document.querySelector('video')
const canvas = window.canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const button = document.querySelector('button')
const analyzis = document.querySelector('.analyzis')
const constraints = {
  audio: false,
  video: true
}

console.log(enviromentDetection);
enviromentDetection(detectionHandler)
