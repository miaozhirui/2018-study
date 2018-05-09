import name from './color';
require('bootstrap');
// require('/Users/mzr/2018-study/nodejs/js/webpack-product/node_modules/bootstrap/dist/css/bootstrap.css');
// require('./index.css')
//
// //会返回一个打包后的地址
// let src = require('./images/thumb.png');
// let img = new Image();
// img.src = src;
//
// document.body.appendChild(img);
//
require('./less.less');
require('./sass.scss')

console.log(name)

let getColor = () => {

    return name
}

