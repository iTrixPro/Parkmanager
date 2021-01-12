const Controller = require('../controllers/Controller')
class Setting extends Controller {

  constructor(options) {
    super(options)
  }

  /**
   * Get the setting view and transfer the data needed.
   * @param  req
   * @param  res
   * @param  path
   */
  getView(req, res, path) {
    if (req.session.loggedIn) {
      this.model.getStatus(req.session.username).then((status) => {
        this.model.getData(req.session.username, status).then((data) => {
          res.render('setting', {'status': status, 'data': data})
        }).catch((err) => setImmediate(() => {throw err}))
      }).catch((err) => setImmediate(() => {throw err}))
    }
  }

  /**
   * Delete an account, action accessible only on the side
   * of the user (public role).
   * @param  req
   * @param  res
   */
  delete(req, res) {
    this.model.removeUser(req.session.username).then((removed) => {
      if (removed) res.redirect('/')
    }).catch((err) => setImmediate(() => {throw err}))
  }

  /**
   * Allow to update your username, only for the public role.
   * @param req
   * @param res
   */
  post(req, res) {
    let new_username = req.body.username
    this.model.updateUsername(req.session.username, new_username).then((username) => {
      req.session.username = username
      res.redirect('/settings')
    }).catch((err) => setImmediate(() => {throw err}))
  }

  toString() {
    return 'Setting'
  }
}

module.exports = Setting