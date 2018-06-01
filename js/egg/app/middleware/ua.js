module.exports = (options, app) => {

    return async function(ctx, next) {

        let userAgent = ctx.get('user-agent');//得到的就是请求头中User-Agent
        // let ua = [/Chrome/, /Firefox/];
        let ua = options.uas

        let matched = ua.some(item => item.test(userAgent));
       
        if(matched) {

            ctx.status = 403; //forbidden
            ctx.body = '无权访问'
        } else {

            await next();
        }
    }
}