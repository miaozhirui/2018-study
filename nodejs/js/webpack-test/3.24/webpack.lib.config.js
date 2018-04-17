const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/lib.js',

    /**
     * target: '_dll_[name]' 指定的是导出变量的名称，也就是挂载在window上面的名字；别的模块引用它就用这个名字
     */
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        /**
         * var 默认，编写的库将通过var被赋值给通过library指定名称的变量
         * commonjs,编写的库将通过Commonjs规范导出
         */
        libraryTarget:'var',//
        library: 'getName'//全局变量的名字， 其它模块会从此变量上获取到里面的模块
    },


}