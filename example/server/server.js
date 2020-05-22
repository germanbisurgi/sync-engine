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
        tags: ['player'],
        image: 'token',
        w: 50,
        h: 50
      })

      engine.world.createBody(entity, {
        x: 150 * Math.cos(Math.random() * Math.PI * 2),
        y: 150 * Math.sin(Math.random() * Math.PI * 2)
      })

      engine.world.addCircle(entity, {
        radius: 25
      })
    }

    engine.network.onDisconnect = function (clientId) {
      const entity = engine.world.getEntity(clientId)
      engine.world.destroyEntity(entity)
    }

    // ----------------------------------------------------------------- polygon

    for (let i = 0; i < 10; i++) {
      const polygon = engine.world.createEntity()
      engine.world.createBody(polygon, {
        x: 300 * Math.cos(Math.random() * Math.PI * 2),
        y: 300 * Math.sin(Math.random() * Math.PI * 2)
      })
      engine.world.addPolygon(polygon, {
        vertices: [
          { x: 0, y: -10 },
          { x: 15, y: 15 },
          { x: -15, y: 15 }
        ],
        restitution: 1.1
      })
    }

    // --------------------------------------------------------------- rectangle

    for (let i = 0; i < 10; i++) {
      const rectangle = engine.world.createEntity()
      engine.world.createBody(rectangle, {
        x: 150 * Math.cos(Math.random() * Math.PI * 2),
        y: 150 * Math.sin(Math.random() * Math.PI * 2)
      })
      engine.world.addRectangle(rectangle, {
        height: 25,
        width: 25,
        restitution: 1.1
      })
    }

    // ------------------------------------------------------------------- edges

    const size = 1000
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

    // -------------------------------------------------------------------- ring

    const ring = engine.world.createEntity({
      tags: ['ring']
    })
    engine.world.createBody(ring)

    engine.world.addCircle(ring, {
      radius: 500,
      isSensor: true
    })

    // ------------------------------------------------------------------ events

    engine.world.onEndContact = function (contact) {
      const entityA = contact.GetFixtureA().GetBody().GetUserData()
      const entityB = contact.GetFixtureB().GetBody().GetUserData()
      if (entityA.tags.includes('player') && entityB.tags.includes('ring')) {
        engine.network.emit('out')
        setTimeout(() => {
          engine.world.setAngularVelocity(entityA, 0)
          engine.world.setLinearVelocity(entityA, { x: 0, y: 0 })
          engine.world.setPosition(entityA, { x: 0, y: 0 })
        }, 1000)
      }

      if (entityB.tags.includes('player') && entityA.tags.includes('ring')) {
        engine.network.emit('out')
        setTimeout(() => {
          engine.world.setAngularVelocity(entityB, 0)
          engine.world.setLinearVelocity(entityB, { x: 0, y: 0 })
          engine.world.setPosition(entityB, { x: 0, y: 0 })
        }, 1000)
      }
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
      const entity = engine.world.entities[client.id]
      const force = 10000 / 100

      inputs.forEach((inputs) => {
        if (inputs.deviceMotions && inputs.deviceMotions.x && Math.round(inputs.deviceMotions.x) !== 0) {
          engine.world.applyForce(entity, {
            x: 0,
            y: inputs.deviceMotions.x / 2
          })
        }
        if (inputs.deviceMotions && inputs.deviceMotions.y && Math.round(inputs.deviceMotions.y) !== 0) {
          engine.world.applyForce(entity, {
            x: inputs.deviceMotions.y / 2,
            y: 0
          })
        }

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
