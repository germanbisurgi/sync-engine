const Audio = function () {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  this.context = new AudioContext()
  this.gain = this.context.createGain()
  this.audioCache = {}
  this.gain.connect(this.context.destination)
  this.setGain(0)
}

Audio.prototype.play = function (name) {
  const source = this.context.createBufferSource()
  source.buffer = this.audioCache[name]
  source.connect(this.gain)
  source.start()
}

Audio.prototype.update = function () {
  if (this.context.state === 'suspended') {
    this.context.resume()
  }
}

Audio.prototype.setGain = function (gain) {
  this.gain.gain.value = gain
}

export default Audio
