const Controller = require('../controllers/Controller')

const MIN_LENGTH = 8
const HAS_UPPERCASE = /[A-Z]/
const HAS_LOWERCASE = /[a-z]/
const HAS_SPECIAL = /[!@#$%^&*]/
class Register extends Controller{

  constructor(options) {
    super(options)
  }

  post(req, res) {
    let user_infos = {'username': req.body.username, 'password': req.body.password}
    this.model.usernameIsUse(user_infos['username']).then((valid) => {
      if (valid) {
        console.log('ERROR: Username already used.')
        res.redirect('/register')
      } else {
          if (this.passwordIsValid(user_infos['password'])) {
            this.model.newUser(user_infos)
            res.redirect('/')
          } else {
              console.log('Error: Password invalid must contains an upper character, a lower one, a number, a special character\
                          and has a minimum length of 8.')
              res.redirect('/register')
          }
      }
    }).catch((err) => setImmediate(() => {throw err}))
  }

  passwordIsValid(password) {

    let valid = true

    if (password.length < MIN_LENGTH) {
      return !valid
    }

    if (!HAS_UPPERCASE.test(password)) {
      return !valid
    }

    if (!HAS_LOWERCASE.test(password)) {
      return !valid
    }

    if (!HAS_SPECIAL.test(password)) {
      return !valid
    }

    return valid
  }

  toString() {
    return 'Register'
  }
}

module.exports = Register