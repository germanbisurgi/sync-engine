/* global Image */

const Loader = function () {
  this.imagesCache = {}
  this.audioCache = {}
  this.start = false
  this.loading = false
  this.complete = false
  this.errors = 0
  this.success = 0
  this.queued = 0
}

Loader.prototype.loadImage = function (config) {
  this.queued++
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      this.success++
      this.imagesCache[config.name] = image
      this.onSuccess(config)
      resolve(image)
    }
    image.onerror = (reason) => {
      this.errors++
      this.onError(config)
      reject(reason)
    }
    image.src = config.url
  })
}

Loader.prototype.loadAudio = function (config) {
  this.queued++
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest()
    const AudioContext = new (window.AudioContext || window.webkitAudioContext)()
    xhr.open('GET', config.url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      AudioContext.decodeAudioData(xhr.response, (buffer) => {
        this.success++
        this.audioCache[config.name] = buffer
        this.onSuccess(config)
        resolve(buffer)
      }, (reason) => {
        this.errors++
        this.onError(config)
        reject(reason)
      })
    }
    xhr.onerror = (reason) => {
      this.errors++
      this.onError(config)
      reject(reason)
    }
    xhr.send()
  })
}

Loader.prototype.onStart = function () {}

Loader.prototype.onSuccess = function () {}

Loader.prototype.onError = function () {}

Loader.prototype.onProgress = function () {}

Loader.prototype.onComplete = function () {}

Loader.prototype.update = function () {
  if (this.queued > 0) {
    if (!this.start) {
      this.start = true
      this.onStart()
    }
    if (this.queued === this.success + this.errors) {
      this.queued = 0
      this.success = 0
      this.errors = 0
      this.loading = false
      this.complete = true
      this.start = false
      this.onComplete()
    } else {
      this.loading = true
      this.complete = false
    }
    let progress = Math.floor((this.success + this.errors) / this.queued * 100)
    if (isNaN(progress)) {
      progress = 100
    }
    this.onProgress(progress)
  }
}
export default Loader
