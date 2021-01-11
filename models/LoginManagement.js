const Model = require('../models/Model')
const bcrypt = require('bcrypt')

class LoginManagement extends Model {

  constructor(config){
    super(config)
  }

  usernameIsValid(username) {
    let stmt = 'SELECT * FROM User WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, [username], (err, result) => {
      if (err) {
        return reject
      }
      return resolve(result.length > 0)
      })
    })
  }

  passwordIsValid(username, password){
    return new Promise((resolve, reject) => {
      let stmt = 'SELECT password FROM User WHERE username = ?'

      this.connection.query(stmt, username, (err, result) => {
       if (err) {
         return reject
       }

        return resolve(bcrypt.compare(password, result[0].password))
      })
    })

  }

}
module.exports = LoginManagement