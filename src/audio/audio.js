const Audio = function () {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  this.context = new AudioContext()
  this.master = this.context.createGain()
  this.audioCache = {}
  this.master.connect(this.context.destination)
}

Audio.prototype.play = function (name) {
  const source = this.context.createBufferSource()
  source.buffer = this.audioCache[name]
  source.connect(this.master)
  source.start()
}

Audio.prototype.update = function () {
  if (this.context.state === 'suspended') {
    this.context.resume()
  }
}

export default Audio
