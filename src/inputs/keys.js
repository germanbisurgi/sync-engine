import Key from './key'

const Keys = function () {
  this.enabled = true
  this.cache = {}
  this.delta = 0
  this.now = 0
  this.then = 0
  this.frame = 0
  document.addEventListener('keydown', this.handleKeyDown.bind(this), false)
  document.addEventListener('keyup', this.handleKeyUp.bind(this), false)
}

Keys.prototype.handleKeyDown = function (event) {
  if (typeof this.cache[event.key] !== 'undefined') {
    this.cache[event.key].hold = true
  }
}

Keys.prototype.handleKeyUp = function (event) {
  if (typeof this.cache[event.key] !== 'undefined') {
    this.cache[event.key].hold = false
  }
}

Keys.prototype.enable = function (key) {
  if (typeof this.cache[key] === 'undefined') {
    this.cache[key] = new Key(key)
  }
  return this.cache[key]
}

Keys.prototype.get = function (key) {
  return this.cache[key]
}

Keys.prototype.update = function () {
  if (this.enabled) {
    this.frame++
    this.now = window.performance.now()
    this.delta = this.now - this.then
    this.then = this.now
    for (const i in this.cache) {
      if (!Object.prototype.hasOwnProperty.call(this.cache, i)) {
        continue
      }
      const key = this.cache[i]
      if (key.hold) {
        key.holdTime += this.delta
        key.endFrame = -1
        if (key.startFrame === -1) {
          key.startFrame = this.frame
        }
      } else {
        key.holdTime = 0
        key.startFrame = -1
        if (key.endFrame === -1) {
          key.endFrame = this.frame
        }
      }
      key.start = (key.startFrame === this.frame)
      key.end = (key.endFrame === this.frame)
      key.delta = this.delta
    }
  }
}

Keys.prototype.destroy = function () {
  this.cache = {}
}

export default Keys
