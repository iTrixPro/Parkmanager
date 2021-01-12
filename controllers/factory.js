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

exports.makeController = (name, options) => {
    return new classes[name](options)
}
