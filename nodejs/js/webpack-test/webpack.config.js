//webpack内部有一个事件流，用的库是tapable
const path = require('path');

module.exports = {

    entry: './src/index.js',//入口
    output: {//出口
        path: path.join(__dirname,'dist'),//输出的文件夹，只能是绝对路径
        filename: 'bundle.js',//打包后的文件名
    },
    module: {

    },
    plugins: [],
    devServer:{

    }
}