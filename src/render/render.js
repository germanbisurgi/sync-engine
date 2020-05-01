const Render = function () {}

Render.prototype.run = function () {
  this.onRender()
  window.requestAnimationFrame(this.run.bind(this))
}

Render.prototype.onRender = function () {}

export default Render
