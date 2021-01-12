const Controller = require('../controllers/Controller')
class Home extends Controller {

  constructor(options) {
    super(options)
  }

  /**
   * Get the home view and give the data needed.
   * @param req
   * @param res
   * @param path
   */
  getView(req, res, path) {
    this.model.getStatus(req.session.username).then((status) => {
      this.model.getFloors().then((floors) => {
        this.model.getUsersWithoutSpot().then((available) => {
          this.model.getUserWithSpot().then((not_available) => {
            res.render('home', {'status': status, 'data': floors, 'assign': available, 'unassign': not_available})
          }).catch((err) => setImmediate(() => {throw err}))
        }).catch((err) => setImmediate(() => {throw err}))
      }).catch((err) => setImmediate(() => {throw err}))
    }).catch((err) => setImmediate(() => {throw err}))
  }

  /**
   * Creation of a new parking spot
   * @param req
   * @param res
   */
  post(req, res) {
    let floor = req.body.floor
    let place_number = req.body.place_number
    this.model.spotExist(floor, place_number).then((exist) => {
      if (!exist) {
        this.model.createParkingSpot(floor, place_number).then((created) => {
          if(created) console.log('New parking spot created with success.')
        }).catch((err) => setImmediate(() => {throw err}))
      }
      res.redirect('/home')
    })
  }

  /**
   * Assign a parking spot to a user
   * @param req
   * @param res
   */
  assign(req, res) {
    let floor = req.body.floor_assign
    let place_number = req.body.place_number_assign
    let username = req.body.username_assign
    this.model.getPlacesByFloor(floor).then((places) => {
      for (let place in places){
        if (place == place_number) {
          this.model.getId(floor, place_number).then((spot_id) => {
            this.model.assign(username, spot_id).then((succeeded) => {
            }).catch((err) => setImmediate(() => {throw err}))
          }).catch((err) => setImmediate(() => {throw err}))
        }
      }
    }).catch((err) => setImmediate(() => {throw err}))
    console.log(req)
    console.log(floor, place_number, username)
    res.redirect('/home')
  }

  /**
   * Unassign a spot to a user
   * @param req
   * @param res
   */
  unassign(req, res) {
    let username = req.body.username_unassign
    this.model.unassign(username).then((succeeded) => {
    }).catch((err) => setImmediate(() => {throw err}))
  }


  toString() {
    return 'Home'
  }

}

module.exports = Home