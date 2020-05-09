const Loop = function (params) {
  const config = Object.assign({
    fps: 50
  }, params)
  this.fps = config.fps
  this.frame = 0
}

Loop.prototype.run = function () {
  setInterval(() => {
    this.step()
  }, 1000 / this.fps)
}

Loop.prototype.step = function () {
  this.frame++
  this.onStep()
}

Loop.prototype.onStep = function () {}

export default Loop
