import test from 'ava'
import {evaluateEnviroment, handleSuccess, handleError} from '../client/src/evaluator.js'
import {detectEnviroment} from '../client/src/setupEnviroment.js'
import {dataURItoBlob} from '../client/src/converter.js'

const cameraAllowed = '<div class="camera-allowed"><div class="video"><video></video><button></button></div></div>'
const cameraDenied = '<div class="camera-denied"></div>'
const nonCapable = '<div class="non-capable"><p>Please use Firefox or Chrome and be equipped by a webcam!</p></div>'
const canvasDom = '<canvas></canvas>'

test('evaluateEnviroment pass', t => {
  document.body.innerHTML = nonCapable
  const para = document.querySelector('.non-capable')
  const result = {'checksPassed': true}
  evaluateEnviroment(result)
  t.is(para.style.display, 'none')
})

test('evaluateEnviroment fail', t => {
  document.body.innerHTML = nonCapable
  const para = document.querySelector('.non-capable')
  const result = {'checksPassed': false}
  evaluateEnviroment(result)
  t.is(para.style.display, 'block')
})

test('detectEnviroment fail', t => {
  const error = t.throws(() => {
    const cb = evaluateEnviroment
    detectEnviroment(cb)
  }, Error)

  t.is(error.message, 'Realeyesit is not defined')
})

test('media stream handleSuccess', t => {
  document.body.innerHTML = cameraAllowed
  const para = document.querySelector('.camera-allowed')
  handleSuccess(null)
  t.is(para.style.display, 'block')
})

test('media stream handleError', t => {
  document.body.innerHTML = cameraDenied
  const para = document.querySelector('.camera-denied')
  const error = {'name': 'test error'}
  handleError(error)
  t.is(para.style.display, 'block')
})

// test('dataURItoBlob', t => {
//   document.body.innerHTML = canvasDom
//   const canvas = document.querySelector('canvas')
//   canvas.width = 5
//   canvas.height = 5
//   console.log(canvas);
//   const ctx = canvas.getContext('2d')
//   ctx.fillRect(0, 0, 5, 5)
//   const uri = canvas.toDataURL()
//   const blob = dataURItoBlob(uri)
//   const type = {}.toString.call(blob)
//   t.deepEqual('[object Blob]', type)
// })
