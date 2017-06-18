
export const video = document.querySelector('video')
export const canvas = window.canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

export const button = document.querySelector('button')

export const analyzisWrapper = document.querySelector('.analyzis-wrapper')
export const analyzis = document.querySelector('.analyzis')

export const errorWrapper = document.querySelector('.error-wrapper')
export const error = document.querySelector('.error')

export function disableButton () {
  button.classList.add('disabled')
  button.disabled = true
}

export function enableButton () {
  button.classList.remove('disabled')
  button.disabled = false
}
