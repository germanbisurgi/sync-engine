const Mathematics = function () {}

Mathematics.prototype.norm = function (value, min, max) {
  return (value - min) / (max - min)
}

Mathematics.prototype.lerp = function (norm, min, max) {
  return (max - min) * norm + min
}

Mathematics.prototype.map = function (value, sourceMin, sourceMax, destMin, destMax) {
  const n = this.norm(value, sourceMin, sourceMax)
  return this.lerp(n, destMin, destMax)
}

export default Mathematics
