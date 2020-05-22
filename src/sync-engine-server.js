import Loop from './loop/loop'
import Mathematics from './mathematics/mathematics'
import Server from './network/server'
import Scene from './scene/scene-system'
import World from './world/world'

const SyncEngineServer = function (config) {
  this.world = new World(config.world)
  this.loop = new Loop(config.loop)
  this.mathematics = new Mathematics()
  this.network = new Server(config.network, this)
  this.scene = new Scene()

  this.loop.onStep = () => {
    if (this.scene.current) {
      if (this.scene.mustCreate) {
        this.scene.current.create(this)
        this.scene.requestUpdate()
      }
      if (this.scene.mustUpdate) {
        this.world.update()
        this.scene.current.update(this)
      }
    }
    if (this.scene.mustSwitch) {
      this.scene.current = this.scene.requested
      this.scene.requestCreate()
    }
  }
}

SyncEngineServer.prototype.start = function () {
  this.loop.run()
}

export default SyncEngineServer
