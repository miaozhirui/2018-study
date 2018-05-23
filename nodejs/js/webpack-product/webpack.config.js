const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');

let cssExtract = new ExtractTextWebpackPlugin('css/css.css');//传入的是打包后的文件名
let lessExtract = new ExtractTextWebpackPlugin('css/less.css');
let scssExtract = new ExtractTextWebpackPlugin('css/scss.css');

module.exports = {

    //单入口文件，是一个字符串
    // entry: './src/index.js',
    // 单入口，是一个数组，最终都会打包到main.js文件里面去
    // entry: ['./src/index.js', './src/base.js'],
    // 多入口，是一个对象;webpack会先找到每个入口，从各个入口分别出发，找到每个入口依赖的模块，然后生成chunk(代码块)，chunk名称就是entry对应的key,将chunk写到文件系统中(assets), 一个入口对应一个代码块(chunk),一个chunk不一定对应一个assets
    // entry: {
    //     // index: './src/index.js',
    //     // base: './src/base.js',
    //     // //这是一个入口，引入jquery库
    //     // vendor: 'jquery'
    //     a: './src/a.js',
    //     b: './src/b.js'
    // },
    entry: './src/main.js',
    //出口文件
    output: {
        //输出的文件夹，必须是绝对路径
        path:path.join(__dirname, 'dist'),
        //打包后的文件名
        //name是entry名字，如果是但入口默认为main; hash是根据打包之后的内容算出来的hash值，长度默认取的是20位，可以通过[hash:8]取出前8位
        filename:'[name].[hash:8].js'
    },
    // devtool:'source-map',//生成单独map文件，可以定位到哪一列出错了，定位的错误最准确, 但是体积最大
    // devtool:'cheap-module-source-map',//生成单独文件，体积更小，但只能定位到哪一行出错了
    // devtool:'eval-source-map',//不会生成单独文件，在文件的底部生成map文件进行映射，比较大
    // devtool:'cheap-module-eval-source-map',//不会生成单独文件，只能定位到行

    resolve:{
        //加载模块的时候，会到下面指定的目录查找
        modules:['node_modules','./lib'],
        //当加载的模块是包的时候，找的入口文件是package.josn里面的main字段，如果没有会依次找browser,node
        mainFields:['main', 'browser', 'node'],
        //配置扩展名, 引入模块的时候可以不加扩展名,加载顺序从前往后
        extensions:[".js", ".json"],
        //配置别名，在js里面直接引用
        alias:{
            react:'react/cjs/react.production.min.js',
            "bootstrap":"bootstrap/dist/css/bootstrap.css",
            vue: 'vue/dist/vue.js'
        }
    },

    watch:false,//设置此参数的时候，当执行npm run build的时候，程序会被挂起，监听文件变化，等待再次打包
    watchOptions:{
        ignored:/node_modules/,//不监听此目录
        poll:1000,//每1秒钟向文件系统发送1000询问，看看是否有文件发生变化
        aggregateTimeout:500,//当改变文件的时候，会等500毫秒，如果这期间没有修改会执行新的打包
    },
    module: {
        noParse:[/react\.production\.min\.js/],
        rules: [
            {
                test: /\.jsx?$/,
                // use:[
                //     {
                //         loader: 'babel-loader'
                //     }
                // ],
                use:'happypack/loader?id=babel',

                //只转换或者编译src目录下面的文件
                include: path.join(__dirname,'./src'),
                //不用解析node_modules
                exclude:/node_modules/
                // use:{
                //     loader:'babel-loader',
                //     // presets: ['env', 'stage-0', 'react']
                //     // options:{
                //     //     presets: ['env', 'stage-0', 'react']
                //     // }
                //
                // }
            },

            {
                //匹配要转换的文件
                test: /\.css$/,
                //css-loader用来解析处理css文件中的url路径，把css文件变成一个js模块
                //style-loader 可以把css文件变成style标签插入到head中
                //多个loader是有顺序要求的，是从右往左写；因为转换的时候是从右往左转换的
                // use: ['style-loader','css-loader']
                //此插件先用css-loader处理一下css文件
                use: cssExtract.extract({
                    use: ['css-loader?minimize']
                })
            },
            //cnpm i file-loader url-loader -D
            {
                //file-loader是解析图片地址，把图片从源位置拷贝到目标位置并修改原引用地址
                //可以处理任意的二进制数据,比如bootstrap里面的字体
                //url-loader 可以在文件比较小的是偶，直接变成base64字符串内嵌到页面中
                test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
                // use: 'file-loader'
                use: {
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options:{
                        limit:9*1024,
                        //指定拷贝文件的输出目录
                        outputPath: 'images/'
                    }
                }
            },
            //cnpm i html-withimg-loader -D
            {
                test: /\.(html|htm)/,

                use:'html-withimg-loader'
            },
            //cnpm i postcss-loader autoprefixer -D
            {
                test: /\.less$/,
                use: lessExtract.extract({
                    use: ['css-loader?minimize', 'less-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss/,
                use: scssExtract.extract({
                    use: ['css-loader?minimize', 'sass-loader']
                })
            },
            {
                test: /\.vue$/,
                use:'vue-loader'
            }
            // cnpm i less less-loader node-sass sass-loader -D
        ]
    },
    plugins: [
        
        //像模块内部注入变量
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // }),

        // new CleanWebpackPlugin([path.join(__dirname, 'dist')]),

        //此插件可以自动产出html文件，默认保存在output.path指定的目录下面
        new HtmlWebpackPlugin({
            
            //指定产出的html模板
            template: './src/index.html',
            //产出的html文件名称
            filename: 'index.html',
            //可以往模板里面传入自定义标题，模板默认使用ejs语法；所以可以在模板里面使用ejs语法，写入变量
            title: 'webpack',
            //会在插入的静态文件加上查询字符串，避免浏览器的缓存；如果是但入口文件的话，每次打包之后都是main.js，浏览器会有缓存，如果想去掉这个缓存的话，就可以加入查询字符串，避免浏览器的缓存
            hash: true,
            //在产出的html文件里面引入哪些代码块，里面的名字要跟entry里面key对应
            // chunks:['vendor', 'index'],
        }), 

        // new HtmlWebpackPlugin({
        //
        //     //指定产出的html模板
        //     template: './src/index.html',
        //     //产出的html文件名称
        //     filename: 'base.html',
        //     //可以往模板里面传入自定义标题，模板默认使用ejs语法；所以可以在模板里面使用ejs语法，写入变量
        //     title: 'webpack',
        //     //会在插入的静态文件加上查询字符串，避免浏览器的缓存；如果是但入口文件的话，每次打包之后都是main.js，浏览器会有缓存，如果想去掉这个缓存的话，就可以加入查询字符串，避免浏览器的缓存
        //     hash: true,
        //     //在产出的html文件里面引入哪些代码块，里面的名字要跟entry里面key对应
        //     chunks:['vendor', 'base'],
        // })
        //cnpm i copy-webpack-plugin -D
        //将源目录下面的内容拷贝到目标目录下面
        new CopyWebpackPlugin([{

            from:path.join(__dirname, 'src/public'),//源文件目录
            to:path.join(__dirname, 'dist/public')//目标目录
        }]),
        new UglifyjsWebpackPlugin(),
        new VueLoaderPlugin(),
        //这个插件指的是想在这个配置文件里面引入另一个动态链接库，会找到mainfest指定的文件，通过这个文件找到里面的name属性对应的动态链接库,当加载库的时候，会到这个动态链接库里面看有没有，有的话直接加载，不需要编译，加快了编译速度；

        // 当在业务模块里面引入react的时候，会先找manifest.json文件,看看里面有没有react模块，有的话，会找到对应的name属性(_dll_[name])，然后找到window._dll_[name]模块，从而拿到里面的编译过后的react(之所以能拿到是因为动态链接库编译了react，并且放到了window._dll_[name]属性上了),所以不用再次打包react，减少了编译的时间
        new webpack.DllReferencePlugin({

            manifest: path.join(__dirname, 'dist', 'manifest.json')
        }),
        cssExtract,
        lessExtract,
        scssExtract,
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        })
    ],

    //配置静态服务器，可以预览打包后的项目
    devServer: {
        //静态文件的根目录
        contentBase: './dist',
        //配置主机
        host: 'localhost',
        //配置端口号，默认8080
        port:8080,
        //服务器返回给浏览器的时候是否启用gzip压缩
        compress: true,
    }
}