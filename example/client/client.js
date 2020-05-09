/* global io SyncEngineClient */

const socket = io()

const engine = new SyncEngineClient({
  network: {
    socket: socket,
    interpolationDelay: 100
  },
  loop: {
    fps: 60
  }
})
const scene = engine.scene.create({
  preload: (engine) => {
    engine.loader.loadImage({ name: 'token', url: './token.png' })
  },
  create: (engine) => {
    engine.inputs.enableKey('w')
    engine.inputs.enableKey('a')
    engine.inputs.enableKey('s')
    engine.inputs.enableKey('d')
    engine.inputs.enablePointer('0')
  }/* ,
  update: (engine) => {
    const interpolate = false
    const reconciliate = false

    if (interpolate) {
      const entity = engine.entities.cache[engine.network.clientId]

      if (engine.inputs.getKey('w').hold === true) {
        entity.y += -200 * engine.inputs.getKey('w').delta / 1000
      }
      if (engine.inputs.getKey('a').hold === true) {
        entity.x -= 200 * engine.inputs.getKey('a').delta / 1000
      }
      if (engine.inputs.getKey('s').hold === true) {
        entity.y += 200 * engine.inputs.getKey('s').delta / 1000
      }
      if (engine.inputs.getKey('d').hold === true) {
        entity.x += 200 * engine.inputs.getKey('d').delta / 1000
      }
    }

    if (reconciliate) {}
  } */
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
