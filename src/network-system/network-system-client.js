/* global io */

const Network = function () {
  this.socket = io()
  this.serverEntities = {}

  this.socket.on('server-update', (serverEntities) => {
    this.serverEntities = serverEntities
  })
}

Network.prototype.sync = function (clientEntities, serverEntities) {
  console.log('networc sync')
  for (const i in serverEntities) {
    if (Object.prototype.hasOwnProperty.call(serverEntities, i)) {
      const entity = serverEntities[i]
      console.log('sync', entity)
    }
  }
}

export default Network
