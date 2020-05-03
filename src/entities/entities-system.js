import Entity from './entity'

const EntitiesSystem = function () {
  this.cache = {}
}

EntitiesSystem.prototype.create = function (config) {
  config.uuid = this.uuid()
  const entity = new Entity(config)
  this.cache[config.uuid] = entity
  return entity
}

EntitiesSystem.prototype.uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default EntitiesSystem
