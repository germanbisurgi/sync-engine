const Scene = function (params) {
  const config = Object.assign({
    create: () => {},
    update: () => {}
  }, params)

  this.create = config.create
  this.update = config.update
}

export default Scene
