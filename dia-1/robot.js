class Robot {
    constructor (name='ecco', x=0, y=0) {
      this.name = name
      this.x = x
      this.y = y
    }

    walkForward() {
      this.x++
    }

    walkBackward() {
      this.x--
    }

    getPos() {
      return [this.x, this.y]
    }

    teleport(x, y) {
      this.x = x
      this.y = y
    }
}

module.exports = {
  Robot,
  version: '1.0.0'
}