/**
 * Created by ls-pc on 2017/2/20.
 */
var express=require('express');
var router=express.Router();
var PostModel=require('../models/posts');
var checkLogin=require('../middlewares/check').checkLogin;//权限控制函数

//get   /posts 所有用户或者特定用户的文章页
// eg:get/post?author=xxx

router.get('/',function(req,res,next){
    res.render('posts');
});

//post   /posts发表一篇文章
router.post('/',checkLogin,function(req,res,next){
    var author=req.session.user._id;
    var title=req.fields.title;
    var content=req.fields.content;

    //校验参数
    try{
        if(!title.length){
            throw new Error('请填写标题')
        }
        if (!content.length){
            throw new Error('请填写内容')
        }
    }catch (e){
        req.flash('error', e.message);
        return res.redirect('back');
    }
    var post={
        author:author,
        title:title,
        content:content,
        pv:0
    };
    PostModel.create(post)
        .then(function(result){
            //此post是插入mongodb后的值，包含_id
            post=result.ops[0];
            req.flash('success','发表成功');
            //发表成功后跳转到该文章页
            res.redirect('/post/${post._id');
        })
        .cache(next);

});

//get   /posts/create 发表文章页
router.get('/create',checkLogin,function(req,res,next){
    res.render('create');
});

//get   /posts/:postId单独一篇的文章页
router.get('/:postId',function(req,res,next){
    res.send(req.flash());
});

//get   /posts/:postId/edit 更新文章页
router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//post  /posts/:postId/edit更新一篇文章
router.post('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//get   /posts/:postId/remove删除一篇文章
router.get('/:postId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//post  /posts/:postId/comment创建一条留言
router.post('/:postId/comment',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//get  /posts/:postId/comment/:commentId/remove删除一条留言
router.get('/:postId/comment/:commentId/remove',function(req,res,next){
    res.send()
});
module.exports=router;
