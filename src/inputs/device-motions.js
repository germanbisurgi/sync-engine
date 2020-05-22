const DeviceMotions = function () {
  this.enabled = true
  this.cache = {}
  window.addEventListener('devicemotion', this.handleDeviceMotion.bind(this), false)
}

DeviceMotions.prototype.handleDeviceMotion = function (event) {
  this.cache.x = event.accelerationIncludingGravity.x
  this.cache.y = event.accelerationIncludingGravity.y
  this.cache.z = event.accelerationIncludingGravity.z
}

DeviceMotions.prototype.get = function (axis) {
  return this.cache[axis]
}

DeviceMotions.prototype.destroy = function () {
  this.cache = {}
}

export default DeviceMotions
