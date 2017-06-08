'use strict';

function uploadImage (image) {
    var formData = new FormData();
    formData.append('photo', image);
    fetch('http://localhost:3030/rekognition/', {
      method:'POST',
       body: formData
    });
  }
