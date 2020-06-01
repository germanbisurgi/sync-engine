const Server = function (params, engine) {
  const config = Object.assign({
    ups: 30,
    socket: null
  }, params)
  this.engine = engine
  this.ups = config.ups
  this.socket = config.socket
  this.clients = {}
  this.interval = setInterval(() => {
    this.serverUpdate()
  }, 1000 / this.ups)

  this.socket.on('connection', (client) => {
    client.inputs = []
    this.clients[client.id] = client
    client.emit('connection', client.id)
    this.onConnection(client.id)

    client.on('disconnect', () => {
      this.onDisconnect(client.id)
      delete this.clients[client.id]
    })

    client.on('client-inputs', (data) => {
      client.inputs.push(data.inputs)
    })

    client.on('message', (data) => {
      data.clientId = client.id
      this.onMessage(data)
    })
  })
}

Server.prototype.emit = function (name, message) {
  this.socket.emit(name, message)
}

Server.prototype.onMessage = function (data) {}

Server.prototype.onConnection = function () {}

Server.prototype.onDisconnect = function () {}

Server.prototype.serverUpdate = function () {
  // console.log('traffic in Mbps:', JSON.stringify(this.engine.world.entities).split('').length * 16 * this.engine.network.ups / 1000000)
  this.socket.emit('server-update', {
    timestamp: Date.now(),
    entities: this.engine.world.entities
  })
}

Server.prototype.update = function (entities) {
}

export default Server
