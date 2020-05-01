const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')

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
    console.log('connection')
    client.emit('connection', 'Hi, you are connected')

    client.on('message', (message) => {
        console.log('message'. message)
        io.emit('message', message)
    })
})




