const Entity = function (params) {
  const config = Object.assign({
    id: '',
    x: 0,
    y: 0
  }, params)

  this.x = config.x
  this.y = config.y
}

export default Entity
