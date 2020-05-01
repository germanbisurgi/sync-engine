const LoopSystem = function () {
  this.fps = 60
}

LoopSystem.prototype.start = function () {
  setInterval(() => {
    this.step()
  }, 1000 / this.fps)
}

LoopSystem.prototype.step = function () {
  this.frame++
  this.onStep()
}

LoopSystem.prototype.onStep = function () {}

export default LoopSystem
