'use strict';

var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d')
var button = document.querySelector('button');
var analyzis = document.querySelector('.analyzis')
var theImg;
var theBlob;
var response;
var boundingBox = {
  'x': 0,
  'y': 0,
  'width': 0,
  'height': 0
}

console.log(boundingBox.x);

var analyzis = document.querySelector('.analyzis');

function drawFace(data){
  for(var face in data){
    boundingBox.x = data[face].BoundingBox.Left * canvas.width;
    boundingBox.y = data[face].BoundingBox.Top * canvas.height;
    boundingBox.width =  data[face].BoundingBox.Width * canvas.width;
    boundingBox.height = data[face].BoundingBox.Height * canvas.height;
    ctx.font = '15px Arial';
    ctx.fillStyle = 'green';
    ctx.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
    ctx.fillText(face, boundingBox.x, boundingBox.y - 5);
    ctx.strokeStyle='green';
    ctx.stroke();
    console.log(boundingBox);
  }
}

function showData(data){
  if(data.status || data.message){
    analyzis.innerHTML = data.status || data.message;
    return;
  };
  analyzis.innerHTML = '';
  var numberOfFaces = data.length;
  analyzis.innerHTML += 'Faces: ' + numberOfFaces +"\n" +
  '---------------------' + "\n"

  for(var face in data){
    analyzis.innerHTML +=
    'face: ' + face + "\n"+
    'gender: ' + data[face].Gender.Value + "\n"+
    'ageRange: ' + data[face].AgeRange.Low + ' - ' + data[face].AgeRange.High + "\n"
    + '---------------------' + "\n"
    }
}

function environmentalDetectionCallback(result) {
  if(!result.checksPassed){
     document.documentElement.style.setProperty(`--non-capable-display`, 'block');
  }
  else{
    document.documentElement.style.setProperty(`--non-capable-display`, 'none');
  }
}
Realeyesit.EnvironmentalDetectionAPI.start(environmentalDetectionCallback);

function userNotAllowed(error){
  if(error.name === "NotAllowedError"){
     document.documentElement.style.setProperty(`--camera-denied-diplay`, 'block');
  }
  else{
    document.documentElement.style.setProperty(`--camera-denied-diplay`, 'none');
  }
}

function createDataUrl(){
  var theImg = canvas.toDataURL('image/jpeg', 1.0);
}

function fetchBlob(){

  var fd = new FormData();
  fd.append('blob', theBlob);

  fetch('/api/test',
      {
        method: 'post',
        body: fd
      })
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
          if (response.status < 200 || response.status >= 300) {
              var error = new Error(json.message);
              error.response = response;
              throw error;
          }
          // Either continue "successful" processing:
          console.log('success!', json);
          response = json;
          showData(response);
          drawFace(response);

          // or return the message to seperate the processing for a followup .then()
          // return json.message;
      })
      .catch(function(ex) {
          console.log('Unhandled Error! ', ex);
      });
}



function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}

var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
  userNotAllowed(error);
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);


button.onclick = function() {
  canvas.width = video.videoWidth * (video.height/video.videoHeight);
  canvas.height = video.height;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  theImg = canvas.toDataURL('image/jpeg', 1.0);
  theBlob = dataURItoBlob(theImg);
  canvas.toBlob(function(blob){}, "image/jpeg", 1.0)
  fetchBlob();
};
