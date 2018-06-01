const BaseController = require('./base');

class UsersController extends BaseController {
    
    /**
     * 注册
     * @return {[type]} [description]
     */
    async signup() {
        let { ctx } = this;
        //1. 得到请求体{username, password, email}
        let user = ctx.request.body;
        
        try{
            
            //保存数据库(_id, username, password, email)
            let doc = await ctx.model.User.create(user);

            this.success(doc)
        }catch(error) {
           
            this.error(error)
        }
        
    }
    
    /**
     * 登录
     * @return {[type]} [description]
     */
    async signin() {

        let {ctx} = this;
        let user = ctx.request.body//拿到请求体到服务器查查看看是否有这个用户
       
        try{
            
            user = await ctx.model.User.findOne(user);
            
            if(user) {

                //如果登录成功了，需要写入session会话
                //可以通过ctx.session.user是否为null来判断用户是否登录
                ctx.session.user = user;
                this.success({user})
            }else {

                this.error('用户名或密码错误')
            }
        } catch(error) {

            this.error(error);
        }
        
    }
    
    /**
     * 退出
     * @return {[type]} [description]
     */
    async signout() {

        let { ctx } = this;

        ctx.session.user = null;

        this.success('退出成功');
    }
}

module.exports = UsersController;