/**
 * Created by ls-pc on 2017/2/21.
 */
var config=require('config-lite');
var Mongolass=require('mongolass');
var mongolass=new Mongolass();
mongolass.connect(config.mongodb);


//用户模型设计
exports.User=mongolass.model('Uesr',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
});
exports.User.index({name:1},{unique:true}).exec();//根据用户名找到用户，用户名全局唯一

//这里我们使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳），修改 lib/mongo.js，添加如下代码：

var moment=require('moment');
var objectIdToTimestamp=require('objectid-to-timestamp');
//根据id生成创建时间created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.Post=mongolass.model('Post',{
    author:{type:Mongolass.Types.objectId},
    title:{type:'string'},
    content:{type:'string'},
    pv:{type:'number'}
});
exports.Post.index({author:1,_id:-1}).exec();//按创建时间降序查看用户的文章列表