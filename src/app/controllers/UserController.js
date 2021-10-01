class UserController {
  userHome(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
      res.render("user/home", {
          user: req.session.user,
          layout: 'user'
    });
    }else{
    res.redirect("/home/login");
    }
  }
  logout(req, res, next) {
    res.clearCookie("user_sid");
    res.redirect("/");
  }
}
module.exports = new UserController();
