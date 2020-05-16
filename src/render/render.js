import Camera from './camera'

const Render = function () {
  this.canvas = document.querySelector('#render-canvas')
  this.context = this.canvas.getContext('2d')
  this.canvas.height = window.innerHeight
  this.canvas.width = window.innerWidth
  this.camera = new Camera()
  this.imagesCache = {}
  this.shapes = []
  this.entities = {}
}

Render.prototype.getImage = function (image) {
  return this.imagesCache[image]
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

  // camera

  this.context.save()

  // translate to camera center
  this.context.translate(
    (this.camera.w / 2),
    (this.camera.h / 2)
  )

  // rotate
  this.context.rotate(this.camera.a)

  // scale
  this.context.scale(this.camera.z, this.camera.z)

  this.context.strokeStyle = 'red'
  this.context.lineWidth = '3'
  this.context.beginPath()
  this.context.arc(0, 0, 50, 0, 2 * Math.PI)
  this.context.stroke()

  this.context.translate(
    -(this.camera.w / 2),
    -(this.camera.h / 2)
  )

  // translate
  this.context.translate(
    -this.camera.x,
    -this.camera.y
  )

  // entities

  for (const i in this.entities) {
    if (Object.prototype.hasOwnProperty.call(this.entities, i)) {
      const entity = this.entities[i]

      if (!entity.v || !entity.image) {
        continue
      }

      this.context.save()

      this.context.translate(
        (entity.x + entity.w * 0.5 * entity.s - entity.w * entity.ax * entity.s),
        (entity.y + entity.h * 0.5 * entity.s - entity.h * entity.ay * entity.s)
      )
      this.context.rotate(entity.a)

      this.context.scale(
        entity.s,
        entity.s
      )

      const image = this.getImage(entity.image)

      if (entity.sw === 0) {
        entity.sw = image.width
      }

      if (entity.sh === 0) {
        entity.sh = image.height
      }

      this.context.drawImage(
        image,
        entity.sx,
        entity.sy,
        entity.sw,
        entity.sh,
        entity.w * -0.5, // do not touch this
        entity.h * -0.5, // do not touch this
        entity.w, // do not touch this
        entity.h // do not touch this
      )
      this.context.restore()
    }
  }

  // console.log(this.shapes)
  this.shapes.forEach((shape) => {
    this.context.save()
    this.context.lineWidth = '1'
    this.context.strokeStyle = '#00ff00'
    switch (shape.type) {
      case 'circle':
        this.context.beginPath()
        this.context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
        this.context.stroke()
        break
      case 'edge':
        this.context.beginPath()
        this.context.moveTo(shape.vertices[0].x, shape.vertices[0].y)
        this.context.lineTo(shape.vertices[1].x, shape.vertices[1].y)
        this.context.stroke()
    }
    this.context.restore()
  })
  this.context.restore()
}

Render.prototype.update = function (entities) {
  this.entities = entities
}

export default Render
