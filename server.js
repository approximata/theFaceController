'use strict';

var express = require('express')
var multer = require('multer')
var AWS = require('aws-sdk')
// var rekRequest = require('./rekognition');
var fs = require('fs-extra');
var browserify = require('browserify')
browserify(['client/src/main.js'])
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(fs.createWriteStream('client/src/build/bundle.js'))

var app = express()

app.use(express.static('client'))

var storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, 'thePic.jpg')
    }
  },
);

var upload = multer({ storage: storage });
var type = upload.single('blob');
var rekognition = new AWS.Rekognition({region: 'eu-west-1'});

app.post('/api/test', type, function (req, res) {
  console.log(req.file);
  var bitmap = fs.readFileSync(req.file.path);
  rekognition.detectFaces(
    {
     "Attributes": [ 'ALL' ],
     "Image": {
        "Bytes": bitmap,
     }
   }, function(err, data) {
			if (err) {
				console.log(err, err.stack);
        res.send(err)// an error occurred
			} else {

        if (data.FaceDetails.length > 0)
        {
          res.json(data.FaceDetails);
        }
        else
        {
				 res.json({status: 'no face detected'});
			  }
			}
		});
  // res.end('uploaded')
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
