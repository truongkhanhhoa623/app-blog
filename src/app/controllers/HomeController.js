const Post = require("../models/post");
const User = require("../models/user");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class HomeController {
  //[GET] /
  home(req, res, next) {
    Post.find({}).then((posts) => {
      res.render("publish", {
        posts: mutipleMongooseToObject(posts),
        layout: "public",
      });
      // res.status(200).json(posts)
    });
  }

  //[GET] home/login
  login(req, res, next) {
    res.render("auth/login", { layout: "auth" });
  }

  //[POST] home/auth
  auth(req, res, next) {
    let { email, password } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        user.comparePassword(password, (error, match) => {
          if (!match) {
            res.redirect("home/login");
            return;
          }
          req.session.user = user;
          console.log(req.session);
          res.redirect("/user");
        });
      })
      .catch((err) => res.redirect("home/login"));
  }

  //[GET] home/signup
  signup(req, res, next) {
    res.render("auth/signup", { layout: "auth" });
  }

  //[PORT] /home/register
  register(req, res, next) {
    const user = new User(req.body);
    // res.json(user);
    user.save()
        .then((docs) => {
          req.session.user = docs;
          console.log(req.session.user);
          res.redirect("/home/login");
        })
        .catch((err) => {
          res.redirect("/home/signup");
        })
    // => {
    //   if (err) {
    //     res.redirect("/home/signup");
    //     return;
    //   }
    //   req.session.user = docs;
    //   res.redirect("/home/login");
    // });
  }
}

module.exports = new HomeController();
