const Network = function (config) {
  this.socket = config.socket
  this.entities = {}
  this.clientInputs = []

  this.socket.on('connection', (id) => {
    console.log('connection', id)
  })

  this.socket.on('entities', (entities) => {
    this.entities = entities
  })
}

Network.prototype.sendInputs = function (inputs) {
  this.socket.emit('client-inputs', inputs)
}

export default Network
