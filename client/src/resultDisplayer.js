'use strict'

import {analyzis} from './domElement.js'

export function showData (data) {
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
