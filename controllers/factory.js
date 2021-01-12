const Login = require('./Login')
const Register = require('./Register')
const Home = require('./Home')
const Setting = require('./Setting')

const classes = {
  Login,
  Register,
  Home,
  Setting
}

/**
 * Factory to make the instance of the class needed
 * @param  name of the controller class
 * @param {*} options needed for the constructor
 */
exports.makeController = (name, options) => {
    return new classes[name](options)
}
