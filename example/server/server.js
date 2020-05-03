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
    socket: socket
  },
  loop: {
    fps: 1
  }
})

const scene = engine.scene.create({
  create: (engine) => {
    // common
    engine.entities.create({ x: 100, y: 100 })
  },
  update: (engine) => {
    // server
    for (const i in engine.entities.cache) {
      if (Object.prototype.hasOwnProperty.call(engine.entities.cache, i)) {
        const entity = engine.entities.cache[i]
        engine.network.inputsBuffer.forEach((inputs) => {
          if (inputs.keys.w && inputs.keys.w.hold === true) {
            entity.y += -100 * inputs.keys.w.delta / 1000
          }
          if (inputs.keys.a && inputs.keys.a.hold === true) {
            entity.x -= 100 * inputs.keys.a.delta / 1000
          }
          if (inputs.keys.s && inputs.keys.s.hold === true) {
            entity.y += 100 * inputs.keys.s.delta / 1000
          }
          if (inputs.keys.d && inputs.keys.d.hold === true) {
            entity.x += 100 * inputs.keys.d.delta / 1000
          }
        })
      }
    }

    engine.network.inputsBuffer = []
  }
})
engine.scene.switch(scene)
engine.start()
