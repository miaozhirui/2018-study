const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
// const HappyPack = require('happypack');
// const WebpackParalleluglifyPlugin = require('webpack-parallel-uglify-plugin');

let other;

const NODE_ENV = process.env.NODE_ENV;

if(NODE_ENV == 'development') {

    other = require('./webpack.dev.config');
} else {

    other = require('./webpack.prod.config');
}

console.log(other);
// console.log(process.env);
module.exports = merge(base, other);












