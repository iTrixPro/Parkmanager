const db = require('mysql')
class Model {

  constructor(config) {

    if (this.constructor == Model) {
      throw new Error('Object of Abstract Class cannot be created')
    }

    this.connection = db.createConnection(config, (err) => {
      if (err) throw err
    })

  }

  /**
   *Get the status(admin/public role) by username
   * @param username
   */
  getStatus(username) {
    let stmt = 'SELECT status FROM User WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, username, (err, result) => {
        if (err) return reject
        return resolve(result[0].status)
      })
    })
  }

  /**
   * End the connection with the database
   */
  endConnection() {
    this.connection.end()
  }

}

module.exports = Model