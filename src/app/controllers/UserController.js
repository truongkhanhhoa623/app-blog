const Post = require("../models/post");
const User = require("../models/user");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const getUser = require("../../util/getUser");

class UserController {
  //[GET] /users/
  userHome(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
      Promise.all([User.find({}), Post.find({})])
        .then(([users, posts]) => {
          return  posts.map((post) => {
            let author = getUser(post.userId, users).username;
            return {
              ...post._doc,
              author,
            };
          });
        })
        .then((posts) => {
          res.render("user/home", {
            user: req.session.user,
            posts: posts,
            layout: "user",
          }); 
        })
        .catch(next);
    } else {
      res.redirect("/");
    }
  }

  //[GET] /user/posts/create
  create(req, res, next) {
    res.render("posts/create", { layout: "main" });
  }

  //[POST] /user/posts/store
  store(req, res, next) {
    let userId = req.session.user._id;
    // res.json(req.body)
    const post = new Post({
      userId,
      ...req.body
    });
    post
      .save()
      .then(() => res.redirect("/user"))
      .catch(next);
  }

  //[GET] /user/logout
  logout(req, res, next) {
    res.clearCookie("user_sid");
    res.redirect("/");
  }
}
module.exports = new UserController();
