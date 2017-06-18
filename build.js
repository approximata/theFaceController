const browserify = require('browserify')
const fs = require('fs-extra')

const imageStream = fs.createWriteStream('client/src/build/bundle.js')

browserify(['client/src/main.js'])
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(imageStream.on('close', () => {
    console.info('build done')
  }))
