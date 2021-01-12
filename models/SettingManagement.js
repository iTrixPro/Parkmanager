const Model = require('./Model')
const bcrypt = require('bcrypt')
const { resolveInclude } = require('ejs')

class SettingManagement extends Model {

  constructor(config) {
    super(config)
  }

  /**
   * get the data that will be display on the setting view.
   * @param {*} username
   * @param {*} status
   */
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

  /**
   * Update of the username.
   * @param username
   * @param new_username
   */
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

  /**
   *  Delete the account from the database.
   * @param {*} username
   */
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