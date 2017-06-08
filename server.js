'use strict';

var express = require('express');
var multer  = require('multer');
var app = express();

app.use(express.static('client')); // for serving the HTML file

var upload = multer({ dest: __dirname + '/public/uploads/' });
var type = upload.single('upl');

app.post('/api/test', type, function (req, res) {
   console.log(req.body);
   console.log(req.file);
   // do stuff with file
});

app.listen(3000);
