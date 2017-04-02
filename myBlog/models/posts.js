/**
 * Created by ls-pc on 2017/2/28.
 */
var Post=require('../lib/mongo').Post;
module.exports={
    create:function create(post){
        return Post.create(post).exec();
    }
}