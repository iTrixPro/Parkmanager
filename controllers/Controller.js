class Controller {

  constructor(options) {

    if (this.constructor == Controller) {
      throw new Error('Object of Abstract Class cannot be created')
    }

    const Model = require(options['path'] + this.toString() + 'Management')
    this.model = new Model(options['config'])

  }

  getView(req, res, path) {
    res.render(path, {'username' : req.session.username})
  }

  post(req, res) {
    throw new Error('Do not call abstract method post')
  }
}

module.exports = Controller