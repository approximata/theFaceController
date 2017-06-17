'use strict'

import {detectEnviroment, showMedia} from './setupEnviroment.js'
import {evaluateEnviroment, handleSuccess, handleError} from './evaluator.js'
import {constraints} from './config.js'
import {takeSnapshout, createImg} from './photoCreator.js'
import {dataURItoBlob} from './converter.js'
import {showResponse} from './responseDisplayer.js'
import {connectApi} from './connection.js'
import {button} from './domElement.js'

detectEnviroment(evaluateEnviroment)
showMedia(constraints, handleSuccess, handleError)

button.onclick = function () {
  takeSnapshout()
  const img = createImg()
  const blob = dataURItoBlob(img)
  connectApi(showResponse, blob)
}
