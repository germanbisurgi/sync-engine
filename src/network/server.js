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

Server.prototype.onConnection = function () {}

Server.prototype.onDisconnect = function () {}

Server.prototype.serverUpdate = function () {
  // const megabits = JSON.stringify(this.engine.world.entities).split('').length * 16 * this.engine.network.ups / 1000000
  // console.log('traffic in Mbps:', megabits)
  this.socket.emit('server-update', {
    timestamp: Date.now(),
    entities: this.engine.world.entities
  })
}

Server.prototype.update = function (entities) {
}

export default Server
