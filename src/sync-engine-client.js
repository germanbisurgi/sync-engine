import Entities from './entities-system/entities-system'
import Loop from './loop/loop'
import Network from './network-system/network-system-client'
import Render from './render/render'
import Scene from './scene-system/scene-system'

const SyncEngineClient = function () {
  this.entities = new Entities()
  this.loop = new Loop()
  this.network = new Network()
  this.render = new Render()
  this.scene = new Scene()

  this.loop.onStep = () => {
    if (this.scene.current) {
      if (this.scene.mustCreate) {
        this.scene.current.create(this)
        this.scene.requestUpdate()
      }
      if (this.scene.mustUpdate) {
        this.scene.current.update(this)
      }
    }
    if (this.scene.mustSwitch) {
      this.scene.current = this.scene.requested
      this.scene.requestCreate()
    }
  }
}

SyncEngineClient.prototype.start = function () {
  this.render.run()
  this.loop.run()
}

export default SyncEngineClient
