const Post =require('../models/post')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class HomeController{
    //[GET] /
    home(req, res, next){
        Post.find({})
        .then((posts)=>{
            res.render('home', {
                posts: mutipleMongooseToObject(posts),
                layout: 'public'});
            // res.status(200).json(posts)
        })
    }
}

module.exports = new HomeController