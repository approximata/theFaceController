
const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const fs = require('fs-extra')
const browserify = require('browserify')
const babelify = require('babelify')
const port = process.env.PORT || 3000

browserify(['client/src/main.js'])
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(fs.createWriteStream('client/src/build/bundle.js'))

const app = express()

app.use(express.static('client'))

const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, 'thePic.jpg')
    }
  }
)

const upload = multer({ storage: storage })
const type = upload.single('blob')
const rekognition = new AWS.Rekognition({
  region: 'eu-west-1',
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
})

app.post('/api/rekognition', type, (req, res) => {
  const bitmap = fs.readFileSync(req.file.path)
  rekognition.detectFaces(
    {
      'Attributes': [ 'ALL' ],
      'Image': {
        'Bytes': bitmap
      }
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        res.send(err)
      }
      else {
        if (data.FaceDetails.length > 0)
        {
          res.json(data.FaceDetails)
        }
        else
        {
          res.json({noface: 'no face detected'})
        }
      }
    })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  }
  else {
    console.info('==> 🌎  Listening on port %s.', port)
  }
})
