const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        //react chunk引用这两个包
        react: ['react', 'react-dom']
    },

    /**
     * target: '_dll_[name]' 指定的是导出变量的名称，也就是挂载在window上面的名字；别的模块引用它就用这个名字
     */
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_dll.js',
        /**
         * var 默认，编写的库将通过var被赋值给通过library指定名称的变量
         * commonjs,编写的库将通过Commonjs规范导出
         */
        libraryTarget:'var',//
        library: '_dll_[name]'//全局变量的名字， 其它模块会从此变量上获取到里面的模块
    },

    plugins: [

        //生成一个manifest.json文件
        //manifest.json 表示一个描述文件
        new webpack.DllPlugin({
            name: '_dll_[name]',//和output.target中一直，值就是输出的manifest.json中的name值
            path:path.join(__dirname,'dist','manifest.json')
        })
    ]
}