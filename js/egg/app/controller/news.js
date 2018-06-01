const { Controller } = require('egg');


class NewsController extends Controller {
    //一般来说控制器只会处理请求的参数，和返回响应
    async index() {

       let { ctx } = this;
       //后端渲染
       // let news = [
       //      {
       //          "title":"标题1",
       //          "url":'http://www.baidu.com'
       //      },
       //      {
       //          "title":"标题2",
       //          "url":'http://www.taobao.com'
       //      },
       // ]
       // ctx.body="你好"
      let news = await this.ctx.service.news.fetch();

      await ctx.render('news.ejs', { news });

    }

    async detail() {

      this.ctx.body = "这是一个详情页面"
    }
}

module.exports = NewsController;