/* global io SyncEngineClient */

const socket = io()

const engine = new SyncEngineClient({
  network: {
    socket: socket
  },
  loop: {
    fps: 60
  }
})
const scene = engine.scene.create({
  create: (engine) => {
    engine.inputs.enableKey('w')
    engine.inputs.enableKey('a')
    engine.inputs.enableKey('s')
    engine.inputs.enableKey('d')
    engine.inputs.enablePointer('0')
  },
  update: (engine) => {
    // move this client player
    const entity = engine.entities.cache[engine.network.clientId]

    if (engine.inputs.getKey('w').hold === true) {
      entity.y += -100 * engine.inputs.getKey('w').delta / 1000
    }
    if (engine.inputs.getKey('a').hold === true) {
      entity.x -= 100 * engine.inputs.getKey('a').delta / 1000
    }
    if (engine.inputs.getKey('s').hold === true) {
      entity.y += 100 * engine.inputs.getKey('s').delta / 1000
    }
    if (engine.inputs.getKey('d').hold === true) {
      entity.x += 100 * engine.inputs.getKey('d').delta / 1000
    }
  }
})
engine.scene.switch(scene)
engine.start()
