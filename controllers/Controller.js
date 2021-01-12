class Controller {

  constructor(options) {

    if (this.constructor == Controller) {
      throw new Error('Object of Abstract Class cannot be created')
    }

    const Model = require(options['path'] + this.toString() + 'Management')
    this.model = new Model(options['config'])

  }

  /**
   * Get the View according to the controller for a X route
   * @param req - unused
   * @param res - use to display the view
   * @param path - path where is located the view
   */
  getView(req, res, path) {
    res.render(path, {'username' : req.session.username})
  }

  /**
   * Abstract method, which will allow to treat forms data
   * @param req
   * @param res
   */
  post(req, res) {
    throw new Error('Do not call abstract method post')
  }
}

module.exports = Controller