const socket = io()

socket.on('connection', (message) => {
    console.log(message)
})

socket.on('message', (message) => {
    console.log(message)
})