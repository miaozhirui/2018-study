'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527832533098_9442';

  // add your config here
  config.middleware = [];

    //配置mongoose mongoose是node里面操作mongodb数据库的一个模块
    //可以以对象的像是操作数据库
  config.mongoose = {

    client: {

        url: 'mongodb://127.0.0.1/blog-api'
    }
  }

  config.security = {

    csrf: false
  }
  return config;
};


