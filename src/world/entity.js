const Entity = function (params) {
  const config = Object.assign({
    id: '',
    tags: [],
    x: 0,
    y: 0,
    a: 0,
    image: '',
    sx: 0,
    sy: 0,
    sw: 0,
    sh: 0,
    w: 0,
    h: 0,
    ax: 0.5,
    ay: 0.5,
    s: 1,
    v: true,
    debug: {}
    // contacts: {
    //   begin: {},
    //   end: {},
    //   preSolve: {},
    //   postSolve: {}
    // }
  }, params)

  this.id = config.id
  this.tags = config.tags
  this.x = config.x
  this.y = config.y
  this.a = config.a
  this.image = config.image
  this.sx = config.sx
  this.sy = config.sy
  this.sw = config.sw
  this.sh = config.sh
  this.w = config.w
  this.h = config.h
  this.ax = config.ax
  this.ay = config.ay
  this.s = config.s
  this.v = config.v
  this.debug = config.debug
  this.contacts = config.contacts
}

export default Entity
