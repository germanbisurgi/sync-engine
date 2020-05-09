const Network = function (params, engine) {
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
    // add client to the client list
    client.inputs = []
    this.clients[client.id] = client

    // send the client its id
    client.emit('connection', client.id)

    // do custom stuff when client connects
    this.onConnection(client.id)

    // when client disconnects remove it from the clients list
    client.on('disconnect', () => {
      this.onDisconnect(client.id)
      delete this.clients[client.id]
    })

    // when client send its inputs
    client.on('client-inputs', (data) => {
      client.inputs.push(data.inputs)
    })
  })
}

Network.prototype.onConnection = function () {}

Network.prototype.onDisconnect = function () {}

Network.prototype.serverUpdate = function () {
  this.socket.emit('server-update', {
    timestamp: Date.now(),
    entities: this.engine.entities.cache
  })
}

Network.prototype.update = function (entities) {
}

export default Network
