import Entities from './entities/entities-system'
import Loop from './loop/loop'
import Network from './network/network-system-server'
import Scene from './scene/scene-system'

const SyncEngineServer = function (config) {
  this.entities = new Entities()
  this.loop = new Loop(config.loop)
  this.network = new Network(config.network, this)
  this.scene = new Scene()

  this.loop.onStep = () => {
    if (this.scene.current) {
      if (this.scene.mustCreate) {
        this.scene.current.create(this)
        this.scene.requestUpdate()
      }
      if (this.scene.mustUpdate) {
        console.log('traffic', JSON.stringify(this.entities.cache).split('').length)
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
