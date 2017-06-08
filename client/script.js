'use strict';

var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
var button = document.querySelector('button');
var blob;


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
  return canvas.toDataURL('image/jpeg', 1.0);
}

function fetchBlob(){
  var myBlob = new Blob([createBlob()], {type : "image/jpeg"});
  console.log(myBlob);

  var fd = new FormData();
  fd.append('upl', myBlob, 'thepic.jpg');

  fetch('/api/test',
  {
      method: 'post',
      body: fd
  });
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
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
      fetchBlob();
    };
