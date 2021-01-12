const Controller = require('../controllers/Controller')
class Home extends Controller {

  constructor(options) {
    super(options)
  }

  toString() {
    return 'Home'
  }
}

module.exports = Home