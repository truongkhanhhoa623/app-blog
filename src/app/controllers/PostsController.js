const Post = require("../models/post");
const User = require("../models/user");

const { mongooseToObject } = require("../../util/mongoose");
const getUser = require("../../util/getUser")
class PostsController {
  //[GET] /post/:slug
  show(req, res, next) {
    Promise.all([ Post.findOne({ slug: req.params.slug }), User.find({})])
      .then(([post, users]) => {
        let author = getUser(post.userId, users).username;
        post = mongooseToObject(post)
        return Object.assign({}, post, { author });
      })
      .then((post)=>{
        res.render("posts/show", {
            post,
          });
      })
      .catch(next);
  }

  //[GET]: /posts/create
  create(req, res, next) {
    res.render("posts/create");
  }
}

module.exports = new PostsController();
