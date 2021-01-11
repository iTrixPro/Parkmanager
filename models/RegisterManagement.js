const Model = require('../models/Model')
const bcrypt = require('bcrypt')

class RegisterManagement extends Model {

  constructor(connection) {
    super(connection)
  }

  newUser(infos) {
    console.log(infos)
    let stmt = 'INSERT INTO User(username, password) VALUES(?, ?)'

    bcrypt.hash(infos['password'], 10).then((hash_password) => {
      this.connection.query(stmt, [
       infos['username'],
       hash_password
      ], (err) => {
        if (err) throw err
      })
    })
  }

  usernameIsUse(username) {
    return new Promise((resolve, reject) => {
      let stmt = "SELECT * FROM User where username = ?"

      this.connection.query(stmt, username, (err, result) => {
        if (err) return reject
        return resolve(result.length > 0)
      })
    })
  }
}
module.exports = RegisterManagement