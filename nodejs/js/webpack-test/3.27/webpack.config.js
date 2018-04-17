const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {

    entry: './src/index.js',
    output: {

        path: path.join(__dirname,'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({

            template: './src/index.html',
            filename:'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),//用名称代替id
    ],
    //配置热加载
    devServer: {
        open:true,//自动打开浏览器
        inline: true,//在打包后文件里面会注入一个websocket客户端
        hot:true,//启动模块热加载
    }
}