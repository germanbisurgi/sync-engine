/* global io SyncEngineClient */

const socket = io()

const engine = new SyncEngineClient({
  network: {
    socket: socket,
    interpolationDelay: 0
  },
  loop: {
    fps: 60
  },
  world: {
    physics: {
      debug: true
    }
  }
})
const scene = engine.scene.create({
  preload: (engine) => {
    engine.loader.loadImage({ name: 'token', url: './token.png' })
    engine.loader.loadImage({ name: 'arena', url: './arena.jpg' })
    engine.loader.loadImage({ name: 'ball', url: './ball.png' })
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
    engine.render.camera.z = 1
  },
  update: (engine) => {
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
})
engine.scene.switch(scene)
engine.start()

// --------------------------------------------------------------------- loading

const percent = document.querySelector('#percent')
const assets = document.querySelector('#assets')

engine.loader.onStart = () => {}

engine.loader.onSuccess = (asset) => {
  const p = document.createElement('p')
  p.innerText = asset.url
  assets.insertBefore(p, assets.firstChild)
}

engine.loader.onError = (asset) => {
}

engine.loader.onProgress = (progress) => {
  percent.innerText = progress
}

engine.loader.onComplete = () => {
  setTimeout(() => {
    document.querySelector('#loading').classList.add('hidden')
  }, 500)
}
