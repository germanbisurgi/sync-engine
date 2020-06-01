const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const SyncEngineServer = require('./sync-engine-server')

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

// ------------------------------------------------------------------------ game

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
    // -------------------------------------------------------------- connection

    engine.network.onConnection = function (clientId) {
      const entity = engine.world.createEntity({
        id: clientId,
        tags: ['player']
      })
      addBodyToPlayerEntity(entity)
    }

    // -------------------------------------------------------------- disconnect

    engine.network.onDisconnect = function (clientId) {
      const entity = engine.world.getEntity(clientId)
      engine.world.destroyEntity(entity)
    }

    // ------------------------------------------------------------- player body

    const addBodyToPlayerEntity = (entity) => {
      engine.world.createBody(entity, {
        x: 150 * Math.cos(Math.random() * Math.PI * 2),
        y: 150 * Math.sin(Math.random() * Math.PI * 2),
        fixedRotation: true
      })
      engine.world.addCircle(entity, {
        radius: 30
      })
    }

    // ----------------------------------------------------------------- explode

    const explode = (entity) => {
      engine.network.emit('destroyed')

      const position = engine.world.getPosition(entity)

      engine.world.destroyBody(entity)

      setTimeout(() => {
        if (engine.network.clients[entity.id]) {
          addBodyToPlayerEntity(entity)
        }
      }, 1000)

      // polygons
      for (let i = 0; i < 5; i++) {
        const polygon = engine.world.createEntity()
        engine.world.createBody(polygon, {
          x: position.x,
          y: position.y,
          linearVelocity: {
            x: 5 * Math.cos(Math.random() * Math.PI * 2),
            y: 5 * Math.sin(Math.random() * Math.PI * 2)
          }
        })
        engine.world.addPolygon(polygon, {
          vertices: [
            { x: 0, y: -10 },
            { x: 15, y: 15 },
            { x: -15, y: 15 }
          ],
          restitution: 1.2
        })
      }

      // rectangles
      for (let i = 0; i < 5; i++) {
        const rectangle = engine.world.createEntity()
        engine.world.createBody(rectangle, {
          x: position.x,
          y: position.y,
          linearVelocity: {
            x: 5 * Math.cos(Math.random() * Math.PI * 2),
            y: 5 * Math.sin(Math.random() * Math.PI * 2)
          }
        })
        engine.world.addRectangle(rectangle, {
          height: 25,
          width: 25,
          restitution: 1.2
        })
      }
    }

    // ---------------------------------------------------------------------- bg

    engine.world.createEntity({
      image: 'gradient',
      w: 10000,
      h: 10000
    })

    // ------------------------------------------------------------------- edges

    const size = 4000
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

    engine.world.createBody(map, { type: 'kinematic', angularVelocity: 0.1 })
    engine.world.addEdges(map, {
      vertices: vertices
    })

    // -------------------------------------------------------------------- ring

    const ring = engine.world.createEntity({
      tags: ['ring']
    })
    engine.world.createBody(ring)

    engine.world.addCircle(ring, {
      radius: 2000,
      isSensor: true
    })

    // ------------------------------------------------------- collisions events

    engine.world.onBeginContact = function (contact) {
      const entityA = contact.GetFixtureA().GetBody().GetUserData()
      const entityB = contact.GetFixtureB().GetBody().GetUserData()
      if (entityA.tags.includes('player') && entityB.tags.includes('player')) {
        engine.network.emit('collision')
      }
    }

    engine.world.onEndContact = function (contact) {
      const entityA = contact.GetFixtureA().GetBody().GetUserData()
      const entityB = contact.GetFixtureB().GetBody().GetUserData()
      if (entityA.tags.includes('player') && entityB.tags.includes('ring')) {
        setTimeout(() => {
          const entity = engine.world.getEntity(entityA.id)
          if (entity) {
            explode(entity)
          }
        })
      }
    }

    // ---------------------------------------------------------- network events

    engine.network.onMessage = (data) => {
      if (Object.prototype.hasOwnProperty.call(data, 'nickname')) {
        engine.network.clients[data.clientId].nickname = data.nickname
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
      const force = 75
      const impulse = 50
      const entity = engine.world.entities[client.id]

      let angle = engine.world.getAngle(entity)

      inputs.forEach((inputs) => {
        if (inputs.pointers[1] && inputs.pointers[1].offsetX > 0) {
          angle += 0.11
        }

        if (inputs.pointers[1] && inputs.pointers[1].offsetX < 0) {
          angle -= 0.11
        }

        if (inputs.keys.ArrowRight && inputs.keys.ArrowRight.hold) {
          angle += 0.11
        }

        if (inputs.keys.ArrowLeft && inputs.keys.ArrowLeft.hold) {
          angle -= 0.11
        }

        if (inputs.keys.ArrowDown && inputs.keys.ArrowDown.start) {
          angle -= Math.PI
        }

        engine.world.setAngle(entity, angle)

        const v = engine.mathematics.angleToPoint(angle, 0, 0, 1)

        if ((inputs.keys.ArrowUp && inputs.keys.ArrowUp.hold === true) || (inputs.pointers[0] && inputs.pointers[0].hold)) {
          engine.world.applyForce(entity, {
            x: v.x * force / inputs.keys.ArrowUp.delta,
            y: v.y * force / inputs.keys.ArrowUp.delta
          })
        }

        if ((inputs.keys[' '] && inputs.keys[' '].start === true)) {
          engine.world.applyImpulse(entity, {
            x: v.x * impulse / inputs.keys[' '].delta,
            y: v.y * impulse / inputs.keys[' '].delta
          })
        }
      })
      client.inputs = []
    }
  }
})
engine.scene.switch(scene)
engine.start()
