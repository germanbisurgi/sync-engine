const Scene = function (params) {
  const config = Object.assign({
    preload: () => {},
    create: () => {},
    update: () => {}
  }, params)

  this.preload = config.preload
  this.create = config.create
  this.update = config.update
}

export default Scene
