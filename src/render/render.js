const Render = function () {
  this.canvas = document.querySelector('#render-canvas')
  this.context = this.canvas.getContext('2d')
  this.canvas.height = window.innerHeight
  this.canvas.width = window.innerWidth
  this.entities = {}
}

Render.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Render.prototype.run = function () {
  this.draw()
  window.requestAnimationFrame(this.run.bind(this))
}

Render.prototype.draw = function () {
  this.clear()
  for (const i in this.entities) {
    if (Object.prototype.hasOwnProperty.call(this.entities, i)) {
      const entity = this.entities[i]
      this.context.save()
      // circle
      this.context.lineWidth = '1'
      this.context.strokeStyle = '#00ff00'
      this.context.beginPath()
      this.context.arc(entity.x, entity.y, 30, 0, 2 * Math.PI)
      this.context.stroke()
      this.context.restore()
    }
  }
}

Render.prototype.update = function (entities) {
  this.entities = entities
}

export default Render
