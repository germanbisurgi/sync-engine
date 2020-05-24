const sceneConfig = {
  preload: (engine) => {
    engine.loader.loadImage({ name: 'ball', url: './assets/images/token.png' })
    engine.loader.loadAudio({ name: 'collision', url: './assets/audio/collision.wav' })
    engine.loader.loadAudio({ name: 'reset', url: './assets/audio/reset.wav' })
    engine.loader.loadAudio({ name: 'wrong', url: './assets/audio/wrong.wav' })
  },
  create: (engine) => {
    engine.inputs.enableKey('w')
    engine.inputs.enableKey('a')
    engine.inputs.enableKey('s')
    engine.inputs.enableKey('d')
    engine.inputs.enableKey('8')
    engine.inputs.enableKey('4')
    engine.inputs.enableKey('5')
    engine.inputs.enableKey('6')
    engine.inputs.enableKey('2')
    engine.inputs.enableKey(' ')
    engine.inputs.enablePointer('0')
    engine.render.camera.z = 0.3

    engine.network.on('collision', () => {
      setTimeout(() => {
        engine.audio.play('collision')
      }, 80)
    })

    engine.network.on('reset', () => {
      engine.audio.play('reset')
    })

    engine.network.on('out', (deaths) => {
      // document.querySelector('#debug').innerHTML = JSON.stringify(deaths, null, 2)
      engine.audio.play('wrong')
    })
  },
  update: (engine) => {
    // engine.render.fullScreen()

    // document.querySelector('#debug').innerHTML = JSON.stringify(engine.inputs.cache, null, 2)

    // if player is connected
    if (engine.world.entities[engine.network.clientId]) {
      // camera follows entity owned by player
      engine.render.camera.follow(engine.world.entities[engine.network.clientId])

      if (engine.inputs.getKey('8').hold === true) {
        engine.render.camera.z += 0.01
      }
      if (engine.inputs.getKey('4').hold === true) {
        engine.render.camera.a += 0.05
      }
      if (engine.inputs.getKey('2').hold === true) {
        engine.render.camera.z -= 0.01
      }
      if (engine.inputs.getKey('6').hold === true) {
        engine.render.camera.a -= 0.05
      }
      if (engine.inputs.getKey('5').hold === true) {
        engine.render.camera.a = 0
        engine.render.camera.z = 1
      }
    }

    // const interpolate = false
    // const reconciliate = false
    //
    // if (interpolate) {
    //   const entity = engine.world.entities[engine.network.clientId]
    //
    //   if (engine.inputs.getKey('w').hold === true) {
    //     entity.y += -200 * engine.inputs.getKey('w').delta / 1000
    //   }
    //   if (engine.inputs.getKey('a').hold === true) {
    //     entity.x -= 200 * engine.inputs.getKey('a').delta / 1000
    //   }
    //   if (engine.inputs.getKey('s').hold === true) {
    //     entity.y += 200 * engine.inputs.getKey('s').delta / 1000
    //   }
    //   if (engine.inputs.getKey('d').hold === true) {
    //     entity.x += 200 * engine.inputs.getKey('d').delta / 1000
    //   }
    // }
    //
    // if (reconciliate) {}
  }
}
