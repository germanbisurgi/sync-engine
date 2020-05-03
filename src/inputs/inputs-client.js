import Keys from './key-system'
import Pointers from './pointer-system'

const Inputs = function () {
  this.cache = {}
  this.keys = new Keys()
  this.pointers = new Pointers()
}

Inputs.prototype.enableKey = function (key) {
  return this.keys.enable(key)
}

Inputs.prototype.getKey = function (key) {
  return this.keys.get(key)
}

Inputs.prototype.enablePointer = function (pointer) {
  return this.pointers.enable(pointer)
}

Inputs.prototype.getPointer = function (pointer) {
  return this.pointers.get(pointer)
}

Inputs.prototype.update = function () {
  this.keys.update()
  this.pointers.update()
  this.cache.keys = this.keys.cache
  this.cache.pointers = this.pointers.cache
}

export default Inputs
