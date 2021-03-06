import Camera from './camera'

const Render = function () {
  this.canvas = document.querySelector('#render-canvas')
  this.context = this.canvas.getContext('2d')
  this.camera = new Camera()
  this.imagesCache = {}
  this.entities = {}

  this.resize()
  // this.fullScreen()

  window.addEventListener('resize', this.resize.bind(this))
}

Render.prototype.resize = function () {
  this.canvas.height = window.innerHeight
  this.canvas.width = window.innerWidth
  this.camera.w = this.canvas.width
  this.camera.h = this.canvas.height
}

Render.prototype.fullScreen = function () {
  // this.canvas.requestFullscreen()
  if (this.canvas.requestFullscreen) {
    this.canvas.requestFullscreen()
  } else if (this.canvas.mozRequestFullScreen) { /* Firefox */
    this.canvas.mozRequestFullScreen()
  } else if (this.canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    this.canvas.webkitRequestFullscreen()
  } else if (this.canvas.msRequestFullscreen) { /* IE/Edge */
    this.canvas.msRequestFullscreen()
  }
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

  this.beforeDraw(this)

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

  this.context.strokeStyle = 'yellow'
  this.context.lineWidth = '2'
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

      if (!entity.v) {
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

      if (entity.image) {
        const image = this.getImage(entity.image)

        if (entity.w === 0) {
          entity.w = image.width
        }

        if (entity.h === 0) {
          entity.h = image.height
        }

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
      }

      this.context.restore()

      switch (entity.debug.shape) {
        case 'circle':
          this.context.save()
          this.context.strokeStyle = 'cyan'
          this.context.lineWidth = '2'
          this.context.translate(
            entity.x,
            entity.y
          )
          this.context.rotate(entity.a)
          this.context.beginPath()
          this.context.arc(0, 0, entity.debug.radius, 0, 2 * Math.PI)
          this.context.stroke()
          this.context.moveTo(0, 0)
          this.context.lineTo(entity.debug.radius, 0)
          this.context.stroke()
          this.context.restore()
          break
        case 'rectangle':
          this.context.save()
          this.context.strokeStyle = 'cyan'
          this.context.lineWidth = '2'
          this.context.translate(
            entity.x,
            entity.y
          )
          this.context.rotate(entity.a)
          this.context.beginPath()
          this.context.rect(entity.debug.w * -0.5, entity.debug.h * -0.5, entity.debug.w, entity.debug.h)
          this.context.stroke()
          this.context.restore()
          break
        case 'edges':
          this.context.save()
          this.context.strokeStyle = 'cyan'
          this.context.lineWidth = '2'
          this.context.translate(
            entity.x,
            entity.y
          )
          this.context.rotate(entity.a)
          this.context.beginPath()
          this.context.moveTo(
            entity.debug.vertices[0].x,
            entity.debug.vertices[0].y
          )
          for (let i = 0; i < entity.debug.vertices.length; i++) {
            this.context.lineTo(
              entity.debug.vertices[i].x,
              entity.debug.vertices[i].y
            )
          }
          this.context.stroke()
          this.context.restore()
          break
        case 'polygon':
          this.context.save()
          this.context.strokeStyle = 'cyan'
          this.context.lineWidth = '2'
          this.context.translate(
            entity.x,
            entity.y
          )
          this.context.rotate(entity.a)
          this.context.beginPath()
          this.context.moveTo(
            entity.debug.vertices[0].x,
            entity.debug.vertices[0].y
          )
          for (let i = 0; i < entity.debug.vertices.length; i++) {
            this.context.lineTo(
              entity.debug.vertices[i].x,
              entity.debug.vertices[i].y
            )
          }
          if (entity.debug.vertices.length > 2) {
            this.context.closePath()
          }
          this.context.stroke()
          this.context.restore()
      }
    }
  }
  this.context.restore()

  this.afterDraw(this)
}

Render.prototype.update = function (entities) {
  this.entities = entities
}

Render.prototype.beforeDraw = function () {}
Render.prototype.afterDraw = function () {}

Render.prototype.circle = function (config) {
  this.context.beginPath()
  this.context.arc(config.x, config.y, config.radius, 0, 2 * Math.PI)
  this.context.stroke()
}

Render.prototype.text = function (config) {
  this.context.fillText(config.text, config.x, config.y)
}

Render.prototype.line = function (config) {
  this.context.beginPath()
  this.context.moveTo(config.ax, config.ay)
  this.context.lineTo(config.bx, config.by)
  this.context.stroke()
}

Render.prototype.rect = function (config) {
  this.context.rect(config.x, config.y, config.width, config.height)
  this.context.stroke()
}

export default Render
