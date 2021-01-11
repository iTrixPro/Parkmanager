const Login = require('./Login')
const Register = require('./Register')
const Home = require('./Home')

const classes = {
  Login,
  Register,
  Home
}

exports.makeController = (name, options) => {
    return new classes[name](options)
}
