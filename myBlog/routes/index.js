/**
 * Created by ls-pc on 2017/2/21.
 */



module.exports = function (app) {

    app.get('/', function (req, res) {
        res.redirect('/posts');
    });

    app.use('/signup', require('./signup'));

    app.use('/signin', require('./signin'));

    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
};
//module.exports = function (app) {
//    var checkNotLogin=require('../middlewares/check').checkNotLogin;
//    app.get('/', function (req, res) {
//        res.redirect('/posts');
//    });
//    app.route('/signup')
//        .get(checkNotLogin,function(req,res,next) {
//            console.log("----------signupget-------------")
//            res.render('signup');
//        })
//        .post(checkNotLogin,function(req,res,next){
//            console.log("----------signuppost-------------")
//            res.send("注册成功");
//        });
//};
