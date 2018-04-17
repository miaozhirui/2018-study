const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ModuleConcatenationPlugin= require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {

    // entry: './src/main.js',
    // entry: {
    //     pageA: './src/pageA',
    //     pageB: './src/pageB',
    //     pageC: './src/pageC'
    // },
    entry: './src/host/host.js',
    output: {

        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'//chunkhash 是基于内容进行hash的
    },
    //优化代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                //不用页面之间的公共模块
                commons: {
                    chunks: 'initial',
                    minChunks: 2,//某个模块至少在两个页面模块中被访问了，才会被提取出来
                    minSize:0
                },

                //第三方模块，比如node_modules里面的模块
                vendor: {
                    chunks: 'initial',
                    test: /node_modules/,
                    name: 'vendor'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env',{modules:false}]//modules:false,就是指定不要把es6的import export 编译成es5的语法
                        ]
                    }
                },
                include: path.resolve('./src'),
                exclude: path.resolve('node_modules')
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({

            template: './src/index.html',
            filename: 'index.html'
        }),
        
        new ModuleConcatenationPlugin(),

        new CleanWebpackPlugin([path.join(__dirname,'dist')])
    ],

    devServer: {
        inline: true,
        hot:true
    }
}