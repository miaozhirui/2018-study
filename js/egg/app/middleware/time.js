module.exports = (options, app) => {

    return async function(ctx, next) {//ctx上下文, next执行下一层中间件

        const start = Date.now();//先记录开始时间
        await next(); //去执行内存逻辑
        console.log(options.prefix + (Date.now() - start) + 'ms');
    }
}