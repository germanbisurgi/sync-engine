import Entities from './entities/entities-system'
import Loader from './loader/loader'
import Loop from './loop/loop'
import Inputs from './inputs/inputs-client'
import Network from './network/network-system-client'
import Render from './render/render'
import Scene from './scene/scene-system'

const SyncEngineClient = function (config) {
  this.entities = new Entities()
  this.loader = new Loader()
  this.loop = new Loop(config.loop)
  this.inputs = new Inputs()
  this.network = new Network(config.network)
  this.render = new Render()
  this.scene = new Scene()

  this.loop.onStep = () => {
    if (this.scene.current) {
      if (this.scene.mustPreload) {
        if (!this.loader.loading) {
          this.scene.current.preload(this)
        }
        this.loader.update()
        if (this.loader.complete) {
          this.render.imagesCache = this.loader.imagesCache
          this.scene.requestCreate()
        }
      }
      if (this.scene.mustCreate) {
        this.scene.current.create(this)
        this.scene.requestUpdate()
      }
      if (this.scene.mustUpdate) {
        this.entities.cache = this.network.getCurrentState()
        this.inputs.update()
        this.network.sendInputs(this.inputs.cache)
        this.render.update(this.entities.cache)
        this.scene.current.update(this)
      }
    }
    if (this.scene.mustSwitch) {
      this.scene.current = this.scene.requested
      this.scene.requestPreload()
    }
  }
}

SyncEngineClient.prototype.start = function () {
  this.render.run()
  this.loop.run()
}

export default SyncEngineClient
