// import $ from 'jquery';
$('#base').html('base');
//npx 可以直接运行node_modules/.bin目录下面的命令
// 通过配置package.json中的script "build":"webpack"
//可以在js里面，在入口文件里面加载css代码, 因为css文件并不是js，所以需要转换,这些转换工具就是loader
require('./index.css');
console.log(11);
console.log(33);