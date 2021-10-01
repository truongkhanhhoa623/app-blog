// middleware check for logged-in users
module.exports = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/user")
    } else {
      next()
    }
  }