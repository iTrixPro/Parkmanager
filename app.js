const express = require('express')
const app = express()
const session = require('express-session')
const factory = require('./controllers/factory')
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

// session setup
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false,
}))

/*
** handle the routes by creating the adequate
** controller and giving him the path of
** the adequate model but also the config of the db
*/
const config = require('./config/config.json')
const user = require('./controllers/logout')
for (let key in config['routes']) {
    if (key == '/logout') {
      app.get(key, (req, res) => {
        user.logout(req, res)
      })
    } else {
      let controller = factory.makeController(config['routes'][key], {'path':'../models/','config': config['db']})
      if(key == '/delete') {
        // delete in the setting view
        app.get(key, (req, res) => {
          controller.delete(req, res)
        })
      } else if (key == '/assign') {
        // assign in the home view
        app.get(key, (req, res) => {
          controller.assign(req, res)
        })
      } else if (key == '/unassign') {
        //unassign in the home view
        app.get(key, (req, res) => {
          controller.unassign(req, res)
        })
      } else {
        app.get(key, (req, res) => {
          controller.getView(req, res, controller.toString().toLowerCase())
        })

        app.post(key, (req, res) => {
          controller.post(req, res)
        })
      }
    }
}

// handle unknown routes
app.use((req, res) => {
  res.render('errors/404')
})


app.listen(PORT)
module.exports = app