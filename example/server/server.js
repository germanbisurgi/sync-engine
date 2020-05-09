const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const SyncEngineServer = require('./libs/sync-engine-server')

const clientPath = path.normalize(path.join(__dirname, '..', 'client'))
const port = 3000

const app = express()

app.use(express.static(clientPath))

const server = http.createServer(app)

server.on('error', (reason) => {
  console.log('server error', reason)
})

server.listen(port, () => {
  console.log('server started in port', port)
})

const socket = socketio(server)

const engine = new SyncEngineServer({
  network: {
    socket: socket,
    ups: 10
  },
  loop: {
    fps: 60
  }
})

const scene = engine.scene.create({
  create: (engine) => {
    engine.network.onConnection = function (clientId) {
      engine.entities.create({
        id: clientId,
        x: 400 * (0.25 + Math.random() * 0.5),
        y: 400 * (0.25 + Math.random() * 0.5),
        angle: 0,
        image: 'token'
      })
    }

    engine.network.onDisconnect = function (clientId) {
      // todo: entine.entities.destroy(entity)
      delete engine.entities.cache[clientId]
    }
  },
  update: (engine) => {
    // physics update
    for (const i in engine.network.clients) {
      if (!Object.prototype.hasOwnProperty.call(engine.network.clients, i)) {
        continue
      }
      const client = engine.network.clients[i]
      const inputs = client.inputs
      const entity = engine.entities.cache[client.id]

      inputs.forEach((inputs) => {
        if (inputs.keys.w && inputs.keys.w.hold === true) {
          entity.y += -200 * inputs.keys.w.delta / 1000
        }
        if (inputs.keys.a && inputs.keys.a.hold === true) {
          entity.x -= 200 * inputs.keys.a.delta / 1000
        }
        if (inputs.keys.s && inputs.keys.s.hold === true) {
          entity.y += 200 * inputs.keys.s.delta / 1000
        }
        if (inputs.keys.d && inputs.keys.d.hold === true) {
          entity.x += 200 * inputs.keys.d.delta / 1000
        }
        entity.a += 0.25
      })

      client.inputs = []
    }
  }
})
engine.scene.switch(scene)
engine.start()
