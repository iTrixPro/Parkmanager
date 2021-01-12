exports.logout = (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false
    res.redirect('/')
  }
}
