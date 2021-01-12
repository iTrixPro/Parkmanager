const Model = require('../models/Model')
class HomeManagement extends Model {

  constructor(config) {
    super(config)
  }

  /**
   * Create a new parking spot.
   * @param floor
   * @param place_number
   */
  createParkingSpot(floor, place_number) {
    let stmt = 'INSERT INTO Parking_spot(floor, place_number) VALUES(?, ?)'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, [
        floor,
        place_number
      ], (err) => {
        if (err) return reject
        return resolve(true)
      })
    })
  }

  /**
   * Check if the parking spot already exist in the database.
   * @param floor
   * @param {*} place_number
   */
  spotExist(floor, place_number) {
    let stmt = 'SELECT * FROM Parking_spot WHERE floor = ? and place_number = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, [
        floor,
        place_number
      ], (err, result) => {
        if (err) return reject
        return resolve(result.length > 0)
      })
    })
  }

  /**
   * Get all the actual floors with available spots and group them to not have some doubles.
   */
  getFloors() {
    let stmt = 'SELECT floor FROM Parking_spot WHERE available = 1 GROUP BY 1'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, (err, result) => {
        if (err) return reject
        return resolve(result)
      })
    })
  }

  /**
   * Get all the actual places/spots available inside of the parking
   * @param {*} floor
   */
  getPlacesByFloor(floor) {
    let stmt = 'SELECT place_number FROM Parking_spot WHERE available = 1 and floor = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, floor, (err, result) => {
        if (err) return reject
        return resolve(result)
      })
    })
  }

  /**
   * Get all the users who don't have any spot for the moment.
   */
  getUsersWithoutSpot() {
    let stmt = 'SELECT username FROM User WHERE parking_spot IS NULL and username != "admin"'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, (err, result) => {
        if (err) return reject
        return resolve(result)
      })
    })
  }

  /**
   * Get all the users who have a spot/place.
   */
  getUserWithSpot() {
    let stmt = 'SELECT username FROM User WHERE parking_spot IS NOT NULL and username != "admin"'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, (err, result) => {
        if (err) return reject
        return resolve(result)
      })
    })
  }

  /**
   * Get the id of the spot/place.
   * @param   floor
   * @param   place_number
   */
  getId(floor, place_number) {
    let stmt = 'SELECT id FROM User WHERE floor = ? and place_number = ? '
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, [
        floor,
        place_number
      ], (err, result) => {
        if (err) return reject
        return resolve(result[0].id)
      })
    })
  }

  /**
   * Assign a parking spot to a client/user.
   * @param username
   * @param spot_id
   */
  assign(username, spot_id) {
    let stmt = 'UPDATE User SET parking_spot = ? WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, [
        spot_id,
        username
      ], (err) => {
        if (err) return reject
        return resolve(true)
      })
    })
  }

  /**
   *  Unassign a parking spot to a user.
   * @param username
   */
  unassign(username) {
    let stmt = 'UPDATE User SET parking_spot IS NULL WHERE username = ?'
    return new Promise((resolve, reject) => {
      this.connection.query(stmt, username, (err) => {
        if (err) return reject
        return resolve(true)
      })
    })
  }

}

module.exports = HomeManagement