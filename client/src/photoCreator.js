'use strict'

import {video, canvas, ctx} from './domElement.js'

export function takeSnapshout () {
  canvas.width = video.videoWidth * (video.height / video.videoHeight)
  canvas.height = video.height
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
}

export function createImg () {
  return canvas.toDataURL('image/jpeg', 1.0)
}
