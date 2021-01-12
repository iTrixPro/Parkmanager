const Model = require('./Model')
const bcrypt = require('bcrypt')
const { resolveInclude } = require('ejs')

class SettingManagement extends Model {

  constructor(config) {
    super(config)
  }

  getStatus(username) {
    let stmt = 'SELECT status FROM User WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, username, (err, result) => {
        if (err) return reject
        return resolve(result[0].status)
      })
    })
  }

  getData(username, status) {
    let stmt = 'SELECT username, parking_spot FROM User WHERE username = ?'
    if (status == 'admin') {
      stmt = 'SELECT username, parking_spot FROM User  WHERE status = "public role" ORDER BY 1'
    }
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, username, (err, result) => {
        if (err) return reject
        return resolve(result)
      })
    })
  }

  updateUsername(username, new_username) {
    let stmt = 'UPDATE User SET username = ? WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, [
        new_username,
        username
      ], (err) => {
        if (err) return reject
        return resolve(new_username)
      })
    })
  }

  removeUser(username) {
    let stmt = 'DELETE FROM User WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, username, (err) => {
        if (err) return reject
        return resolve(true)
      })
    })
  }
}

module.exports = SettingManagement