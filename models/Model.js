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

  endConnection() {
    this.connection.end()
  }

}

module.exports = Model