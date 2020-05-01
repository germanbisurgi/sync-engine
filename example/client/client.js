const socket = io()

socket.on('server-update', (entities) => {
  console.log('server-update', entities)
})

socket.on('connection', () => {
  console.log('connection')
  const engine = new SyncEngineClient()
  const scene = engine.scene.create({
    create: (engine) => {
      console.log('...create', engine.loop.frame)
      const entity = engine.entities.create({
        x: 100,
        y: 100
      })
    },
    update: (engine) => {
    }
  })
  engine.scene.switch(scene)
  engine.start()
})