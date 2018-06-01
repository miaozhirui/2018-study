exports.keys = "mzr";//用来加密cookie的，防止修改cookie

//只有在此处配置的中间件才会起作用
exports.middleware = [
    'time',
    // 'ua'
]
exports.time = {

    prefix: '本次请求时间一共花了'
}
exports.ua = {

    uas: [/Chrome/, /Firefox/]
}

exports.view = {
    
    defaultViewEngine: 'ejs',//默认的渲染引擎
    //设置针对什么类型的文件用什么模板引擎来进行渲染
    mapping: {
        
        //如果是.ejs的话，用ejs模板进行渲染
        ".ejs": "ejs"
    }
}

exports.news = {

    url: 'http://news.baidu.com/'
}