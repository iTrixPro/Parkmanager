const Controller = require('../controllers/Controller')
class Login extends Controller {

  constructor(options) {
    super(options)
  }


  post(req, res) {
    let username = req.body.username
    let password = req.body.password
    this.model.usernameIsValid(username).then((valid) => {
      if(!valid) {
        console.log('ERROR : Username is invalid.')
        res.redirect('/')
      } else {
        this.model.passwordIsValid(username, password).then((valid) => {
          if (!valid) {
            console.log('ERROR : Password is invalid.')
            res.redirect('/')
          } else {
            req.session.loggedin = true
            req.session.username = username
            res.redirect('/home')
          }
        }).catch((err) => setImmediate(() => {throw err}))
      }
    }).catch((err) => setImmediate(() => {throw err}))
  }


  toString(){
    return 'Login'
  }

}

module.exports = Login