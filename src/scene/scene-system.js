import Scene from './scene'

const SceneSystem = function () {
  this.current = null
  this.requested = null
  this.mustCreate = false
  this.mustUpdate = false
  this.mustSwitch = false
}

SceneSystem.prototype.create = function (config) {
  return new Scene(config)
}

SceneSystem.prototype.switch = function (scene) {
  this.requested = scene
  this.requestSwitch()
}

SceneSystem.prototype.requestCreate = function () {
  this.mustCreate = true
  this.mustUpdate = false
  this.mustSwitch = false
}

SceneSystem.prototype.requestUpdate = function () {
  this.mustCreate = false
  this.mustUpdate = true
  this.mustSwitch = false
}

SceneSystem.prototype.requestSwitch = function () {
  this.mustCreate = false
  this.mustUpdate = false
  this.mustSwitch = true
}

export default SceneSystem
