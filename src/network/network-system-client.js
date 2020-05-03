const Network = function (config) {
  this.socket = config.socket
  this.clientId = ''
  this.entities = {}
  this.clientInputs = []

  this.socket.on('connection', (clientId) => {
    this.onConnection(clientId)
  })

  this.socket.on('entities', (entities) => {
    this.entities = entities
  })
}

Network.prototype.onConnection = function () {}

Network.prototype.sendInputs = function (inputs) {
  this.socket.emit('client-inputs', {
    clientId: this.clientId,
    inputs: inputs
  })
}

export default Network
