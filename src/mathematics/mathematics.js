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

Mathematics.prototype.random = function (min, max) {
  return (min + (Math.random() * (max - min)))
}

Mathematics.prototype.randomInt = function (min, max) {
  return Math.round(this.random(min, max))
}

Mathematics.prototype.randomChoice = function (choices) {
  return choices[this.randomInt(0, choices.length - 1)]
}

Mathematics.prototype.clamp = function (number, min, max) {
  return Math.max(min, Math.min(max, number))
}

Mathematics.prototype.between = function (number, min, max) {
  return ((number >= min) && (number <= max))
}

Mathematics.prototype.toRadians = function (degrees) {
  return degrees * (Math.PI / 180)
}

Mathematics.prototype.toDegrees = function (radians) {
  return radians * (180 / Math.PI)
}

Mathematics.prototype.distance = function (x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

Mathematics.prototype.pointToAngle = function (originX, originY, pointX, pointY) {
  return Math.atan2(pointY - originY, pointX - originX)
}

Mathematics.prototype.angleToPoint = function (angle, originX, originY, radius) {
  return {
    x: Math.cos(angle) * radius + originX,
    y: Math.sin(angle) * radius + originY
  }
}

export default Mathematics
