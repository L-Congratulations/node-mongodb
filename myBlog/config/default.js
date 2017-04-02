/**
 * Created by ls-pc on 2017/2/18.
 */
//配置文件
module.exports={
    port:3000,
    session:{
        secret:'myblog',
        key:'myblog',
        maxAge:2592000000
    },
    mongodb:'mongodb://localhost:27017/myblog'
};
