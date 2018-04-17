//webpack内部有一个事件流，用的库是tapable
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cssExtract = new ExtractTextWebpackPlugin('css/css.css');
const lessExtract = new ExtractTextWebpackPlugin('less/less.css');
const scssExtract = new ExtractTextWebpackPlugin('scss/scss.css');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    // entry: './src/index.js',//1 字符串. 单入口
    // entry: [//2 数组 .多个入口文件，会都打包到bundle.js里面，打包到同一个文件里面
    //
    //     './src/index.js',
    //     './src/base.js'
    // ],
    // entry: { //3. 对象，打包出来的是多个入口文件，插入到html的时候也是多个文件,这种方式output里面的filename文件名称不能写死(webpack发现这是一个对象的时候，先找到每一个入口文件，找到依赖的模块，打包生成一个chunk(代码块); 最后会把chunk写到文件系统中,成为一个资源Assets；一个入口文件代表着一个chunk)
    //     index: './src/index.js',
    //     base: './src/base.js',
    //     //这是一个入口，引用jquery
    //     // vendor: 'jquery'
    //
    //     common: './src/common'//可以把公共的文件抽取出来，在index,base模块都引入进去；但是common里面的私有变量，这两个模块是拿不到的,可以把这个私有变量编程全局变量
    // },
    entry: './src/main.js',
    output: {//出口
        path: path.join(__dirname,'dist'),//输出的文件夹，只能是绝对路径
        // filename: 'bundle.js',//打包后的文件名
        //name是entry名字mian(单入口)，如果是都入口就是制定的key ; hash是根据打包后的文件内容计算出来的一个hash值(长度是32位)
        filename: '[name].[hash:8].js'
    },

    //可以配置选项
    resolve: {
        //引入模块的时候，可以不加扩展名;会依次按照数组的顺序查找文件；利用率越高的往前找
        extensions: ['','.js', '.less', '.json'],
        //webpack在require模块的时候，会看看这边是否有别名，如果有的话，会加载该模块
        alias: {
            'bootstrap': 'bootstrap/dist/css/bootstrap.css'
        }
    },
    //表示监控源文件的变化，当原文件发生改变的时候，则从新打包
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     poll:1000,//每一秒钟向文件系统询问1000，看看源文件是否发生了变化了；该数值越大，每秒钟想文件系统询问的次数就越多，会导致性能问题
    //     aggregateTimeout:500//当文件发生变化的时候，会先等500毫秒，如果没有文件发生变化的话，则重新编译
    // },
    // devtool: 'source-map',//生成单独map文件，可以定位到哪一列出错了
    // devtool: 'cheap-module-source-map',//单独文件，体积更小，但只能定位到行
    // devtool: 'eval-source-map',//不会产生单独文件,把map文件直接放到源文件里面；只能用于开发环境，不能用于生成环境
    // devtool: 'cheap-module-eval-source-map',//不会生成单独文件，只能定位到行

    /*
    loader有三种写法
    use
    loader
    use+loader
    * */
    module: {
        rules:[
            //将jquery暴露到全局
            {
                test: require.resolve('jquery'),//分析一个模块，获得绝对路径
                // loader:'expose-loader?$'
                // use: 'expose-loader?$'
                use: {
                    loader: 'expose-loader',//此模块将私有变量，转成公共的变量
                    options: '$'
                }
            },

            //处理图片模块
            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                //如果loader加参数的话，必须写成对象，不能写成字符串了
                use: {
                    // loader: 'file-loader',
                    loader: 'url-loader',//如果图片特别小的话，可以将图片转换成base64直接嵌入到css文件里面，减少http的访问

                    options: {
                        limit: 9*1024,
                        outputPath: 'images'//指定拷贝文件的输出目录，如果不指定直接输出到images;如果指定了则输出到dist下面的某个目录下面
                    }
                } //解析图片地址，把图片从源位置拷贝到目标位置，并且修改原引用地址;可以处理任意的二进制数据
            },

            //处理html模块
            {
                test: /\.(html|htm)$/,
                loader: 'html-withimg-loader'
            },

            //处理css模块
            {
                test: /\.css$/, //转换文件匹配规则
                //css-loader用来解析css文件中的url路径，把css文件变成一个模块
                //style-loader用来把css文件变成style标签插入head标签中
                //多个Loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换
                // loader: ['style-loader','css-loader','postcss-loader']
                loader: cssExtract.extract({
                    //加上minimize就可以压缩了
                    use: ['css-loader?minimize']
                })
            },

            //处理less模块
            {
                test: /\.less$/, //转换文件匹配规则

                // loader: ['style-loader','css-loader', 'less-loader']
                //加上minimize就可以压缩了
                loader: lessExtract.extract({
                    use: ['css-loader?minimize', 'less-loader','postcss-loader']
                })
            },

            //处理sass模块
            {
                test: /\.scss$/, //转换文件匹配规则

                // loader: ['style-loader','css-loader', 'sass-loader']
                loader: scssExtract.extract({
                    use:['css-loader?minimize', 'sass-loader','postcss-loader']
                })
            },

            {
                test: /\.js$/,
                //如果需要传入参数的话，需要写成对象
                use: {
                    loader: 'babel-loader',
                    query: {
                            //env转化es6
                            //stage-0转化es7
                            //react转化react
                            presets: ['env','stage-0', 'react']

                        }
                }
            }
        ]
    },
    plugins: [
        //自动向模块内部注入变量,如果每个模块都需要使用外部的chunk里面的变量，可以用这种方式注入(比如讲jquery作为chunk输出出来，在其他chunk的模块内部使用，可以使用这种方式)
        // new webpack.ProvidePlugin({
        //
        //     $:'jquery'
        // }),
        //打包之前先删除dist目录
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
        //此插件可以自动产出html文件
        new HtmlWebpackPlugin({
            template:'./src/index.html',//制定产出的html模板
            filename: 'index.html',//产出的文件名
            title: 'index',//模板被当成了ejs模板，所以里面可以写ejs语法
            // chunks:['vendor','index'],//在产出的HTML文件里引入哪些代码块；数组里面的名称就写entry的key, 因为一个key对应一个代码块，引入的时候就会把对应的代码块引入
            // chunks:['common', 'index'],
            hash: true,//会在引入的js里加入查询字符串避免缓存
            minify: {//移除Html的引号
              removeAttributeQuotes: true
            }
        }),
        // new HtmlWebpackPlugin({
        //     template:'./src/index.html',//制定产出的html模板
        //     filename: 'base.html',//产出的文件名
        //     title: 'base',//模板被当成了ejs模板，所以里面可以写ejs语法
        //     // chunk: ['vendor','base'],
        //     chunk: ['index','common'],
        //     hash: true,//会在引入的js里加入查询字符串避免缓存
        //     minify: {//移除Html的引号
        //         removeAttributeQuotes: true
        //     }
        // })

        //拷贝文件
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './src/public'),
                to: path.join(__dirname, './dist/public')
            }
        ]),

        //压缩js
        new UglifyjsWebpackPlugin(),
        cssExtract,
        lessExtract,
        scssExtract
    ],
    devServer:{
        contentBase:'./dist',//webpack-dev-server的根设置在哪里
        host: 'localhost',
        port: 8080,
        compress: true,//服务器返回给浏览器的时候是否启动gzip压缩
    }
}