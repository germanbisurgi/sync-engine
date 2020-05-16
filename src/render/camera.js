const Camera = function () {
  this.x = 0
  this.y = 0
  this.w = 0
  this.h = 0
  this.z = 1
  this.a = 0
  this.l = 0.1

  this.resize()

  window.addEventListener('resize', this.resize.bind(this))
}

Camera.prototype.follow = function (point) {
  this.x += (point.x - (this.w / 2) - this.x) * this.l
  this.y += (point.y - (this.h / 2) - this.y) * this.l
  // this.x = point.x - this.w / 2
  // this.y = point.y - this.h / 2
}

// todo: resize relative t the canvas and not relative to the window
Camera.prototype.resize = function () {
  this.w = window.innerWidth
  this.h = window.innerHeight
}

export default Camera
