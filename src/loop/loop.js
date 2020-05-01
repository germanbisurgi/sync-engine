const Loop = function () {
  this.fps = 1
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
