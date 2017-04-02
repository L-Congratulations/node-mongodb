/**
 * Created by ls-pc on 2017/2/20.
 */
var express=require('express');
var router=express.Router();
var checkLogin=require('../middlewares/check').checkLogin;

//get /signout登出
router.get('/',checkLogin,function(req,res,next){
    //清空session中用户信息
    req.session.user=null;
    req.flash('success','登出成功');
    //登出后跳转到主页

    res.redirect('/posts');
});

module.exports=router;