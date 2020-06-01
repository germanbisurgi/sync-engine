const sceneConfig = {
  preload: (engine) => {
    engine.loader.loadImage({ name: 'ball', url: './assets/images/token.png' })
    engine.loader.loadImage({ name: 'gradient', url: './assets/images/gradient.png' })
    engine.loader.loadAudio({ name: 'collision', url: './assets/audio/collision.wav' })
    engine.loader.loadAudio({ name: 'reset', url: './assets/audio/reset.wav' })
    engine.loader.loadAudio({ name: 'wrong', url: './assets/audio/wrong.wav' })
    engine.loader.loadAudio({ name: 'impulse', url: './assets/audio/impulse.wav' })
    engine.loader.loadAudio({ name: 'destroyed', url: './assets/audio/destroyed.wav' })
  },
  create: (engine) => {
    engine.inputs.enableKey('ArrowRight')
    engine.inputs.enableKey('ArrowLeft')
    engine.inputs.enableKey('ArrowUp')
    engine.inputs.enableKey('ArrowDown')
    engine.inputs.enableKey('8')
    engine.inputs.enableKey('4')
    engine.inputs.enableKey('5')
    engine.inputs.enableKey('6')
    engine.inputs.enableKey('2')
    engine.inputs.enableKey(' ')
    engine.inputs.enablePointer('0')
    engine.inputs.enablePointer('1')
    engine.render.camera.z = 0.5

    engine.network.on('collision', () => {
      setTimeout(() => {
        engine.audio.play('collision')
      }, 80)
    })

    engine.network.on('destroyed', () => {
      setTimeout(() => {
        engine.audio.play('destroyed')
      }, 80)
    })

      engine.render.afterDraw = () => {
      engine.render.context.save()
      engine.render.context.strokeStyle = '#00ff00'
      engine.render.context.lineWidth = '1'
      engine.render.context.textAlign = 'center'
      engine.render.context.text = 'center'
      engine.render.context.fillStyle = '#00ff00';
      engine.render.context.lineWidth = '1'

      for (const i in engine.inputs.cache.pointers) {
        if (Object.hasOwnProperty.call(engine.inputs.cache.pointers, i)) {
          const pointer = engine.inputs.cache.pointers[i]
          if (pointer.hold) {
            engine.render.circle({
              x: pointer.startX,
              y: pointer.startY,
              radius: 60
            })

            engine.render.circle({
              x: pointer.x,
              y: pointer.y,
              radius: 30
            })

            // engine.render.text({
            //   text: 'type: ' + pointer.type,
            //   x: pointer.startX,
            //   y: pointer.startY - 130
            // })
            //
            // engine.render.text({
            //   text: 'id: ' + pointer.id,
            //   x: pointer.startX,
            //   y: pointer.startY - 115
            // })
            //
            // engine.render.text({
            //   text: 'startX: ' + pointer.startX + ', startY: ' + pointer.startY,
            //   x: pointer.startX,
            //   y: pointer.startY - 100
            // })
            //
            // engine.render.text({
            //   text: 'currentX: ' + pointer.x + ', currentY: ' + pointer.y,
            //   x: pointer.startX,
            //   y: pointer.startY - 85
            // })
            //
            // engine.render.text({
            //   text: 'offsetX: ' + pointer.offsetX + ', offsetY: ' + (pointer.offsetY),
            //   x: pointer.startX,
            //   y: pointer.startY - 70
            // })
            //
            // engine.render.line({
            //   ax: pointer.startX,
            //   ay: pointer.startY,
            //   bx: pointer.x,
            //   by: pointer.y
            // })
          }
        }
      }
      engine.render.context.restore()
    }
  },
  update: (engine) => {
    // engine.render.fullScreen()

    // document.querySelector('#debug').innerHTML = JSON.stringify(engine.inputs.cache, null, 2)

    // if player is connected
    if (engine.world.entities[engine.network.clientId]) {
      // camera follows entity owned by player
      engine.render.camera.follow(engine.world.entities[engine.network.clientId])

      if (engine.inputs.getKey('8').hold === true) {
        engine.render.camera.z += 0.005
      }
      if (engine.inputs.getKey('4').hold === true) {
        engine.render.camera.a += 0.05
      }
      if (engine.inputs.getKey('2').hold === true) {
        engine.render.camera.z -= 0.005
      }
      if (engine.inputs.getKey('6').hold === true) {
        engine.render.camera.a -= 0.05
      }
      if (engine.inputs.getKey('5').hold === true) {
        engine.render.camera.a = 0
        engine.render.camera.z = 0.5
      }

      if (engine.inputs.getKey(' ').start === true) {
        engine.audio.play('impulse')
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
