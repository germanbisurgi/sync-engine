import Pointer from './pointer'

const Pointers = function () {
  this.enabled = true
  this.cache = {}
  this.delta = 0
  this.now = 0
  this.then = 0
  this.frame = 0
  this.canvas = document.querySelector('#render-canvas')
  this.enablePointers()
}

Pointers.prototype.enable = function (pointer) {
  if (typeof this.cache[pointer] === 'undefined') {
    this.cache[pointer] = new Pointer(pointer)
  }
  return this.cache[pointer]
}

Pointers.prototype.get = function (pointer) {
  return this.cache[pointer]
}

Pointers.prototype.enablePointers = function () {
  this.canvas.style.touchAction = 'none' // needed for mobile
  this.canvas.style.userSelect = 'none' // needed for mobile
  this.canvas.addEventListener('pointerdown', this.handlePointerDown.bind(this), false)
  this.canvas.addEventListener('pointermove', this.handlePointerMove.bind(this), false)
  this.canvas.addEventListener('pointerup', this.handlePointerUpAndCancel.bind(this), false)
  this.canvas.addEventListener('pointercancel', this.handlePointerUpAndCancel.bind(this), false)
  this.canvas.addEventListener('pointerleave', this.handlePointerUpAndCancel.bind(this), false)
  window.addEventListener('contextmenu', this.handleContextMenu.bind(this), false)
}

Pointers.prototype.getPointerByID = function (id) {
  let output = false
  for (const i in this.cache) {
    if (Object.hasOwnProperty.call(this.cache, i)) {
      const pointer = this.cache[i]
      if (pointer.id === id) {
        output = pointer
      }
    }
  }
  return output
}

Pointers.prototype.getInactivePointer = function () {
  let output = false
  for (const i in this.cache) {
    if (Object.hasOwnProperty.call(this.cache, i)) {
      const pointer = this.cache[i]
      if (pointer.active === false) {
        output = pointer
      }
    }
  }
  return output
}

Pointers.prototype.handlePointerDown = function (event) {
  event.preventDefault()
  const pointer = this.getPointerByID(event.pointerId) || this.getInactivePointer()
  if (pointer) {
    pointer.active = true
    pointer.id = event.pointerId
    pointer.type = event.pointerType // 'mouse', 'pen', 'touch'
    pointer.hold = true
    pointer.startX = event.clientX - event.target.offsetLeft
    pointer.startY = event.clientY - event.target.offsetTop
    pointer.x = event.clientX - event.target.offsetLeft
    pointer.y = event.clientY - event.target.offsetTop
  }
}

Pointers.prototype.handlePointerMove = function (event) {
  event.preventDefault()
  const pointer = this.getPointerByID(event.pointerId) || this.getInactivePointer()
  if (pointer) {
    pointer.id = event.pointerId
    pointer.x = event.clientX - event.target.offsetLeft
    pointer.y = event.clientY - event.target.offsetTop
  }
}

Pointers.prototype.handlePointerUpAndCancel = function (event) {
  event.preventDefault()
  const pointer = this.getPointerByID(event.pointerId)
  if (pointer) {
    pointer.active = false
    pointer.hold = false
  }
}

Pointers.prototype.handleContextMenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

Pointers.prototype.update = function () {
  if (this.enabled) {
    this.frame++
    this.now = window.performance.now()
    this.delta = this.now - this.then
    this.then = this.now
    for (const i in this.cache) {
      if (Object.hasOwnProperty.call(this.cache, i)) {
        const pointer = this.cache[i]
        if (pointer.hold) {
          pointer.offsetX = (pointer.x - pointer.startX)
          pointer.offsetY = (pointer.y - pointer.startY)
          pointer.holdTime += this.delta
          pointer.endFrame = -1
          if (pointer.startFrame === -1) {
            pointer.startFrame = this.frame
          }
        } else {
          pointer.offsetX = 0
          pointer.offsetY = 0
          pointer.holdTime = 0
          pointer.startFrame = -1
          if (pointer.endFrame === -1) {
            pointer.endFrame = this.frame
          }
        }
        pointer.start = (pointer.startFrame === this.frame)
        pointer.end = (pointer.endFrame === this.frame)
        pointer.delta = this.delta
      }
    }
  }
}

Pointers.prototype.destroy = function () {
  this.cache = {}
}

export default Pointers
