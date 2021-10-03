const Post = require("../models/post");
const { mutipleMongooseToObject } = require("../../util/mongoose");


class MeController {
       storedPosts(req, res, next){
        Post.find({userId: req.session.user._id})
            .then((posts)=>{
                res.render('me/stored-posts', {
                    posts: mutipleMongooseToObject(posts),
                    layout: 'user'})
            })
            .catch(next) 
    }
  }

module.exports = new MeController();
