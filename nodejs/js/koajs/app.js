const Koa = require('koa');
const app = new Koa();
app.context.name = 'miaozhirui'

app.use(async (ctx, next)=> {

    console.log(ctx.request.url)
    console.log(ctx.request.originalUrl)
    await next();
})

app.use(async ctx => {

    ctx.body = "到底了";
})

app.on('error', (error, ctx) => {

    console.log(error)
})
app.listen(3000);