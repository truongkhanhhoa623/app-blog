const Post = require("../models/post");
const User = require("../models/user");

const { mongooseToObject } = require("../../util/mongoose");
const getUser = require("../../util/getUser");
class PostsController {
  //[GET] /posts/:slug
  show(req, res, next) {
    Promise.all([Post.findOne({ slug: req.params.slug }), User.find({})])
      .then(([post, users]) => {
        let author = getUser(post.userId, users).username;
        post = mongooseToObject(post);
        return Object.assign({}, post, { author });
      })
      .then((post) => {
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
  //[GET] /posts/:id/edit
  edit(req, res, next) {
    Post.findOne({ _id: req.params.id }).then((post) => {
      res.render("posts/edit", { post: mongooseToObject(post) });
    });
  }

  //[PUT] /posts/:id
  update(req, res, next) {
    Post.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/post/"))
      .catch(next);
  }

  //[DELETE] /posts/:id
  delete(req, res, next) {
    Post.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new PostsController();
