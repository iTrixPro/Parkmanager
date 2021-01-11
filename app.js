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
for (let key in config['routes']) {
  let controller = factory.makeController(config['routes'][key], {'path':'../models/','config': config['db']})

  app.get(key, (req, res) => {
    controller.getView(req, res, controller.toString().toLowerCase())
  })

  app.post(key, (req, res) => {
    controller.post(req, res)
  })

}

// handle unknown routes
app.use((req, res, next) => {
  res.render('errors/404')
})

app.listen(PORT)
module.exports = app