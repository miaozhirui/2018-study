const path = require('path');
const webpack = require('webpack');

/**
 * target: '_dll_[name]' 指定的是导出变量的名称
 *
 */
module.exports = {

    entry: {
        react: ['react', 'react-dom'],
    },
    output: {

        path: path.join(__dirname, 'dist'),
        filename: '[name]_dll.js',//输出动态链接库的名字，name去的是enter里面的react名称
        library: '_dll_[name]',//暴露成全局变量的名字,放到window上面;其他模块会从此变量上说去到里面的模块
        //这个属性和library是配合来使用的；默认值是var，就是将library对应的名称通过var声明(var _dll_[name]=...)
        libraryTarget: 'var'
    },
    plugins:[
        new webpack.DllPlugin({
            name: '_dll_[name]',//这个名字一定要与output.target保持一致，是在manifest文件中使用的
            path: path.join(__dirname, 'dist', 'manifest.json')//会生成一个描述文件，里面有个name属性，就是上面指定的
        })
    ]
}