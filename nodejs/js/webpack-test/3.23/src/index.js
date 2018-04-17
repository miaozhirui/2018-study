// expose-loader?全局变量!模块名 他会先加载此模块，然后得到模块的导出对象，并且挂载到window上面
// let $ = require('expose-loader?$!jquery');
// require('expose-loader?$!jquery')
let $ = require('jquery');
$('#app').html('index22244');
require('./index2.js');
// import $ from 'jquery';
//npx 可以直接运行node_modules/.bin目录下面的命令
// 通过配置package.json中的script "build":"webpack"
//可以在js里面，在入口文件里面加载css代码, 因为css文件并不是js，所以需要转换,这些转换工具就是loader
require('./index.css');
//!叹号代表把模块交给前面的loader处理，?问号代表给这个loader传递的参数
// require('style-loader!css-loader!./index.css')