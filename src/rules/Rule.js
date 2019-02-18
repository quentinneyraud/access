const ACCEPTED_LEVELS = ['none', 'warning', 'error']

export default class Rule {
  constructor () {
    this.level = 'error'
  }

  set level(value) {
    if (ACCEPTED_LEVELS.indexOf(this.level) === -1) {
      console.warn(`${value} is not an accepted rule level`)
    }
  }

  async execute () {}
}
