const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const WebpackParalleluglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',//如果是入口文件的话，[name]指的是main;如果是对象的话，指的是key
        publicPath: 'http://localhost:8080'
    },
    resolve: {
        //创建别名
        alias: {

        },
        extensions:['.js', '.josn'],
        //如果加载的模块是包的话，会这样去找入口文件
        mainFields: ['main','browser', 'node'],
        //搜索模块从指定的模块里面去搜索,减少搜索范围
        modules:[path.resolve('node_modules'), path.resolve('lib')]
    },
    module: {
        //不需要解析此库
        // noParse: [/react\.production\.min\.js/],
        rules: [
            {
                test: /\.jsx?$/,
                // use: [
                //     {
                //         loader: 'babel-loader',
                //         // options: {
                //         //     presets: ["env", "stage-0", 'react']
                //         // }
                //     }
                // ],
                use: 'happypack/loader?id=babel',
                //只转换或者编译src目录下面的文件
                include: path.resolve('./src'),

                exclude: /node_modules///不要解析node_modules文件夹
            },
            {
                test: /\.css?$/,

                use: 'happypack/loader?id=css',
                //只转换或者编译src目录下面的文件
                include: path.resolve('./src'),

                exclude: /node_modules///不要解析node_modules文件夹
            }
        ]
    },
    plugins:[
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader']
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, 'dist', 'manifest.json')
        }),

        new WebpackParalleluglifyPlugin({
            workerCount: 3, //开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false, //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',//模板的位置
            filename: 'index.html'//生成文件的名称
        }),
        
        //定义代码中的环境变量
        new webpack.DefinePlugin({
            __development__: JSON.stringify(process.env.NODE_ENV)
        })
    ]


}












