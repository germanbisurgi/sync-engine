import Entity from './entity'
import Physics from './physics/physics-system'

const World = function (config) {
  this.physics = new Physics(config.physics)
  this.entities = {}
}

// -------------------------------------------------------------------- entities

World.prototype.createEntity = function (params) {
  const config = Object.assign({
    id: this.createId(),
    x: 0,
    y: 0
  }, params)
  const entity = new Entity(config)
  this.entities[config.id] = entity
  return entity
}

World.prototype.getEntity = function (id) {
  return this.entities[id]
}

World.prototype.destroyEntity = function (entity) {
  this.physics.destroyBody(entity)
  delete this.entities[entity.id]
}

World.prototype.createId = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// --------------------------------------------------------------------- physics

World.prototype.createBody = function (entity, params) {
  return this.physics.createBody(entity, params)
}

World.prototype.addCircle = function (entity, params) {
  this.physics.addCircle(entity, params)
}

World.prototype.addEdge = function (entity, params) {
  this.physics.addEdge(entity, params)
}

World.prototype.applyForce = function (entity, params) {
  this.physics.applyForce(entity, params)
}

World.prototype.applyTorque = function (entity, params) {
  this.physics.applyTorque(entity, params)
}

World.prototype.getLinearVelocity = function (entity) {
  return this.physics.getLinearVelocity(entity)
}

// ---------------------------------------------------------------------- update

World.prototype.update = function () {
  this.physics.update()
}

export default World
