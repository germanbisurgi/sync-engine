const Network = function (config) {
  this.socket = config.socket
  this.clientId = ''
  this.entities = {}
  this.serverUpdates = []
  this.renderDelay = 50
  this.firstServerTimestamp = 0
  this.firstClientTimestamp = 0

  this.socket.on('connection', (clientId) => {
    this.clientId = clientId
  })

  this.socket.on('server-update', (data) => {
    this.processGameUpdate(data)
  })
}

Network.prototype.processGameUpdate = function (data) {
  if (this.firstServerTimestamp === 0) {
    this.firstServerTimestamp = data.timestamp
    this.firstClientTimestamp = Date.now()
  }

  this.serverUpdates.push(data)

  // todo: Keep only one game update before the current server time
  const base = this.getBaseUpdate()
  if (base > 0) {
    this.serverUpdates.splice(0, base)
  }
}

Network.prototype.getCurrentState = function () {
  if (!this.firstServerTimestamp) {
    return {}
  }

  const base = this.getBaseUpdate()
  const serverTime = this.currentServerTime()

  // If base is the most recent update we have, use its state.
  // Else, interpolate between its state and the state of (base + 1).
  if (base < 0) {
    return this.serverUpdates[this.serverUpdates.length - 1].entities
  } else if (base === this.serverUpdates.length - 1) {
    return this.serverUpdates[base].entities
  } else {
    const baseUpdate = this.serverUpdates[base]
    const next = this.serverUpdates[base + 1]
    const r = (serverTime - baseUpdate.timestamp) / (next.timestamp - baseUpdate.timestamp)
    // console.log(this.serverUpdates.length)
    // todo: interpolate entities
    const interpolated = {}

    for (const i in baseUpdate.entities) {
      if (!Object.prototype.hasOwnProperty.call(baseUpdate.entities, i)) {
        continue
      }

      const entity1 = baseUpdate.entities[i]
      const entity2 = next.entities[i]
      interpolated[i] = {
        x: this.interpolate(entity1.x, entity2.x, r),
        y: this.interpolate(entity1.y, entity2.y, r)
      }
    }
    // console.log(interpolated)
    return interpolated
  }
}

Network.prototype.interpolate = function (older, newer, ratio) {
  if (!newer) {
    return older
  }
  return older + (newer - older) * ratio
}

Network.prototype.currentServerTime = function () {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.renderDelay
}

Network.prototype.getBaseUpdate = function () {
  const serverTime = this.currentServerTime()
  for (let i = this.serverUpdates.length - 1; i >= 0; i--) {
    if (this.serverUpdates[i].timestamp <= serverTime) {
      return i
    }
  }
  return -1
}

Network.prototype.getCurrentServerTimestamp = function (inputs) {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.renderDelay
}

Network.prototype.sendInputs = function (inputs) {
  this.socket.emit('client-inputs', {
    clientId: this.clientId,
    inputs: inputs
  })
}

export default Network
