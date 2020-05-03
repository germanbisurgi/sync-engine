const Key = function (key) {
  this.delta = 0
  this.key = key
  this.start = false
  this.end = false
  this.hold = false
  this.holdTime = 0
  this.startFrame = 0
  this.endFrame = 0
}

export default Key
