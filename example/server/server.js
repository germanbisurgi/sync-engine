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
    ups: 30
  },
  loop: {
    fps: 60
  },
  world: {
    fps: 60,
    debug: true
  }
})

const scene = engine.scene.create({
  create: (engine) => {
    engine.network.onConnection = function (clientId) {
      // ---------------------------------------------------------------- circle

      const entity = engine.world.createEntity({
        id: clientId,
        image: 'token',
        w: 50,
        h: 50
      })

      engine.world.createBody(entity)

      engine.world.addCircle(entity, {
        radius: 25
      })
    }

    engine.network.onDisconnect = function (clientId) {
      const entity = engine.world.getEntity(clientId)
      engine.world.destroyEntity(entity)
    }

    // ----------------------------------------------------------------- polygon

    const polygon = engine.world.createEntity()
    engine.world.createBody(polygon)
    engine.world.addPolygon(polygon, {
      vertices: [
        { x: 0, y: -40 },
        { x: 50, y: 50 },
        { x: -50, y: 50 }
      ]
    })

    // --------------------------------------------------------------- rectangle

    const rectangle = engine.world.createEntity()
    engine.world.createBody(rectangle)
    engine.world.addRectangle(rectangle)

    // ------------------------------------------------------------------- edges

    const size = 300
    const sides = 6
    const centerX = 0
    const centerY = 0
    const vertices = []

    for (let i = 0; i <= sides; i++) {
      const v = {
        x: centerX + size * Math.cos(i * 2 * Math.PI / sides),
        y: centerY + size * Math.sin(i * 2 * Math.PI / sides)
      }
      vertices.push(v)
    }

    const map = engine.world.createEntity()

    engine.world.createBody(map, { type: 'kinematic' })
    engine.world.addEdges(map, {
      vertices: vertices // todo: at least 2 vertices
    })
  },
  update: (engine) => {
    // physics update
    for (const i in engine.network.clients) {
      if (!Object.prototype.hasOwnProperty.call(engine.network.clients, i)) {
        continue
      }
      const client = engine.network.clients[i]
      const inputs = client.inputs
      const entity = engine.world.entities[client.id]
      const force = 10000 / 100

      inputs.forEach((inputs) => {
        if (inputs.keys.w && inputs.keys.w.hold === true) {
          engine.world.applyForce(entity, {
            x: 0,
            y: -force * inputs.keys.w.delta / 1000
          })
        }
        if (inputs.keys.a && inputs.keys.a.hold === true) {
          engine.world.applyForce(entity, {
            x: -force * inputs.keys.a.delta / 1000,
            y: 0
          })
        }
        if (inputs.keys.s && inputs.keys.s.hold === true) {
          engine.world.applyForce(entity, {
            x: 0,
            y: force * inputs.keys.s.delta / 1000
          })
        }
        if (inputs.keys.d && inputs.keys.d.hold === true) {
          engine.world.applyForce(entity, {
            x: force * inputs.keys.d.delta / 1000,
            y: 0
          })
        }
        if (inputs.keys[' '] && inputs.keys[' '].hold === true) {
          engine.world.applyTorque(entity, 500)
        }
      })
      client.inputs = []
    }
  }
})
engine.scene.switch(scene)
engine.start()
