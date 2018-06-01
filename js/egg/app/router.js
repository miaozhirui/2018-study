//egg.js是基于koa封装的一个上级框架
//router是路由中间件的router实例，可以在她身上定义路由规则
//controller 控制器的容器
//get指的是http的方法名
module.exports = (app) => {

    const { router, controller } = app;
  
    router.get('/', controller.home.index);
 
    router.get('/news', controller.news.index);
    router.get('/news/detail', controller.news.detail);
}