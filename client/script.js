'use strict';

var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
var button = document.querySelector('button');
var theImg;
var theBlob;
var response;

var analyzis = document.querySelector('.analyzis');

function showData(data){
  for(var face in data){
    console.log(data[face].BoundingBox);
    var faceKeys = Object.keys(data[face]);
    console.log(faceKeys);
    for(var key in faceKeys){
        console.log(faceKeys[key]);
        // console.log(data[face].faceKeys[key].replace(/"/g, ""));
    }
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

//   fetch('/api/test',
//   {
//       method: 'post',
//       body: fd
//   }).then(function(res)
//   {
//     console.log(res)
//     response = res.json()
//     console.log(response);
//
//   })
// .catch(function(res){ console.log('catch' + res) })

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
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
      theImg = canvas.toDataURL('image/jpeg', 1.0);
      theBlob = dataURItoBlob(theImg);
      canvas.toBlob(function(blob){}, "image/jpeg", 0.75)
      fetchBlob();
    };
