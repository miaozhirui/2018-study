const { Service } = require('egg');
const moment = require('moment');
moment.locale('zh-cn');//修改成本地的时间

class NewsService extends Service{

    async fetch() {
        // console.log(this.ctx.helper);
        let { data } = await this.ctx.curl(this.config.news.url);
        
        data = data.toString();
        let news = [];
        let self = this;
        
        //正则匹配url地址
        let reg = /<a href="(.+?)".+?>([\s\S]+?)<\/a>/g;

        data.replace(reg, function(matched, url, title) {

            news.push({

                title,
                url,
                time:new Date()
                // time:self.ctx.helper.relative(new Date())
            })
        })

        return news;
    }   
}

module.exports = NewsService;