const Client = function (params) {
  const config = Object.assign({
    socket: null,
    interpolationDelay: 100
  }, params)
  this.socket = config.socket
  this.interpolationDelay = config.interpolationDelay
  this.clientId = null
  this.entities = {}
  this.serverUpdates = []
  this.firstServerTimestamp = 0
  this.firstClientTimestamp = 0

  this.socket.on('connection', (clientId) => {
    this.clientId = clientId
  })

  this.socket.on('server-update', (data) => {
    this.processGameUpdate(data)
  })
}

Client.prototype.on = function (name, callback) {
  this.socket.on(name, (data) => {
    callback(data)
  })
}

Client.prototype.emit = function (message) {
  this.socket.emit('message', message)
}

Client.prototype.processGameUpdate = function (data) {
  if (this.firstServerTimestamp === 0) {
    this.firstServerTimestamp = data.timestamp
    this.firstClientTimestamp = Date.now()
  }

  this.serverUpdates.push(data)

  const base = this.getBaseUpdate()
  if (base > 0) {
    this.serverUpdates.splice(0, base)
  }
}

Client.prototype.getCurrentState = function () {
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
    const interpolated = {}

    for (const i in baseUpdate.entities) {
      if (!Object.prototype.hasOwnProperty.call(baseUpdate.entities, i)) {
        continue
      }

      const olderEntity = baseUpdate.entities[i]
      const newerEntity = typeof next.entities[i] !== 'undefined' ? next.entities[i] : olderEntity
      interpolated[i] = {
        id: newerEntity.id,
        tags: newerEntity.tags,
        x: this.interpolate(olderEntity.x, newerEntity.x, r),
        y: this.interpolate(olderEntity.y, newerEntity.y, r),
        a: this.interpolate(olderEntity.a, newerEntity.a, r),
        image: newerEntity.image,
        sx: newerEntity.sx,
        sy: newerEntity.sy,
        sw: newerEntity.sw,
        sh: newerEntity.sh,
        w: newerEntity.w,
        h: newerEntity.h,
        ax: newerEntity.ax,
        ay: newerEntity.ay,
        s: newerEntity.s,
        v: newerEntity.v,
        debug: newerEntity.debug,
        contacts: newerEntity.contacts
      }
    }
    return interpolated
  }
}

Client.prototype.interpolate = function (older, newer, ratio) {
  return older + (newer - older) * ratio
}

Client.prototype.currentServerTime = function () {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.interpolationDelay
}

Client.prototype.getBaseUpdate = function () {
  const serverTime = this.currentServerTime()
  for (let i = this.serverUpdates.length - 1; i >= 0; i--) {
    if (this.serverUpdates[i].timestamp <= serverTime) {
      return i
    }
  }
  return -1
}

Client.prototype.getCurrentServerTimestamp = function (inputs) {
  return this.firstServerTimestamp + (Date.now() - this.firstClientTimestamp) - this.interpolationDelay
}

Client.prototype.sendInputs = function (inputs) {
  this.socket.emit('client-inputs', {
    clientId: this.clientId,
    inputs: inputs
  })
}

export default Client
