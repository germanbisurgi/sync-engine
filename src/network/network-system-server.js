const Network = function (config) {
  this.socket = config.socket
  this.clients = {}
  this.inputsBuffer = []

  this.socket.on('connection', (client) => {
    this.clients[client.id] = client
    client.emit('connection', client.id)
    client.on('client-inputs', (inputs) => {
      this.inputsBuffer.push(inputs)
    })
    this.onConnect(client)
  })
}

Network.prototype.onConnect = function () {}

Network.prototype.sendEntities = function (entities) {
  this.socket.emit('entities', entities)
}

Network.prototype.update = function (entities) {
}

export default Network
