/* global io SyncEngineClient */

const socket = io()

const engine = new SyncEngineClient({
  network: {
    socket: socket,
    interpolationDelay: 100
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

const scene = engine.scene.create(sceneConfig)
engine.scene.switch(scene)
engine.start()

// ----------------------------------------------------------------- ui controls

const uiGain = document.querySelector('#ui-gain')
const uiNickname = document.querySelector('#ui-nickname')

uiGain.addEventListener('change', (event) => {
  engine.audio.setGain(event.target.value / 100)
})

uiNickname.addEventListener('input', (event) => {
  console.log('uiNickname', event.target.value)
  engine.network.emit('nickname', event.target.value)
})

// ------------------------------------------------------------------ ui loading

const percent = document.querySelector('#percent')
const assets = document.querySelector('#assets')

engine.loader.onStart = () => {
  document.querySelector('#loading').classList.add('show')
}

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
    document.querySelector('#loading').classList.remove('show')
  }, 500)
}
