'use strict'

export default function apiConnection (callback, blob) {
  const fd = new FormData()
  fd.append('blob', blob)

  fetch('/api/test',
    {
      method: 'post',
      body: fd
    })
    .then(response => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(json.message);
        error.response = response
        throw error
      }
      console.log('success!', json)
      response = json
      callback(response)
    })
    .catch(function (ex) {
      console.log('Unhandled Error! ', ex)
    })
}
