
// ############### 1. 热更新 #######################

// import base from './base';
// import base2 from './base2';
//
// document.querySelector('#app').innerHTML = base();
// document.querySelector('#app2').innerHTML = base2();
//
// require('./index.css')

//热更新代码
// if(module.hot) {
//
//     //如果检测到了base模块更新了，则会调用此回调函数
//     module.hot.accept('./base', function () {//接受儿子的变化，
//         // let base2 = require('./base2');
//         // document.querySelector('#app2').innerHTML = base2();
//         document.querySelector('#app').innerHTML = base();
//     })
// }
