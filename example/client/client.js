const socket = io()



socket.on('connection', () => {
  console.log('connection')
  const engine = new SyncEngineClient()
  let entity
  const scene = engine.scene.create({
    create: (engine) => {
      console.log('...create', engine.loop.frame)
      entity = engine.entities.create({
        x: 100,
        y: 100
      })
    },
    update: (engine) => {
      engine.network.sync()
    }
  })
  engine.scene.switch(scene)
  engine.start()
})