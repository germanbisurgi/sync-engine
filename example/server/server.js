const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const SyncEngineServer = require('./libs/sync-engine-server')

const clientPath = path.normalize(__dirname + '/../client')
const port = 3000


const app = express()

app.use(express.static(clientPath))

const server = http.createServer(app)

server.on('error', (reason) => {
  console.log('server error', poreasonrt)
})

server.listen(port, () => {
  console.log('server started in port', port)
})

const io = socketio(server)

io.on('connection', (client) => {
    console.log('CLIENT:', 'connection')
    client.emit('connection')
})

const engine = new SyncEngineServer()
const scene = engine.scene.create({
  create: (engine) => {
    console.log('...create', engine.loop.frame)
    const entity = engine.entities.create({
      x: 100,
      y: 100
    })
  },
  update: (engine) => {
    console.log('...update', engine.loop.frame, engine.entities.cache)
    io.emit('server-update', engine.entities.cache)
  }
})
engine.scene.switch(scene)
engine.start()


