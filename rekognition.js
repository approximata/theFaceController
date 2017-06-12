'use strict';

var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs-extra');
// AWS.config.region = 'eu-west-1';

var bitmap = fs.readFileSync('./public/uploads/thePic.jpg');
var rekognition = new AWS.Rekognition({region: 'eu-west-1'});

function rekRequest(theImg) {
  console.log('rekRequest invited');
  var bitmap = fs.readFileSync(theImg);
  rekognition.DetectFaces(
    {
     "Attributes": [ 'ALL' ],
     "Image": {
        "Bytes": bitmap,
     }
   }, function(err, data) {
			if (err) {
				console.log(err, err.stack); // an error occurred
			} else {
				console.log(data);           // successful response
			}
		});
}
