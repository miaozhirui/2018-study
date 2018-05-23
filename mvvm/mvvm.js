function Mzr(options = {}) {

    this.$options = options;//将所有属性挂载在了$options
    var data = this._data = this.$options.data;

    observer(data);

    //this 代理了this._data(数据代理)
    for(let key in data) {

        Object.defineProperty(this,key,{

            enumerable:true,
            get() {

                return this._data[key];//this.a = {b:1}
            },
            set(newVal) {

                this._data[key] = newVal
            }
        })
    }

    initComputed.call(this);
    new Compile(options.el, this)


}

function initComputed() {

    let vm = this;
    let computed = this.$options.computed;//拿到computed所有的key属性

    Object.keys(computed).forEach(function (key) {

        Object.defineProperty(vm, key, {//先拿到computed[key],是函数或者对象

            enumerable:true,
            get:typeof computed[key] === 'function' ? computed[key] : computed[key].get,//如果是函数，直接返回函数；如果是对象，直接返回对象里面的get方法

        })

    })

}

//观察对象给对象增加Object.defineProperty
function observer(data) {

    if(typeof data !== 'object') return;

    return new Observer(data);
}


function Observer(data) {
    let dep = new Dep();

    for (let key in data) {//把data属性通过object.defineProperty的方式来重写属性
        let val = data[key];

        observer(val)

        Object.defineProperty(data, key, {

            enumerable: true,
            get() {

                //实现了订阅

                Dep.target && dep.addSub(Dep.target);

                return val;
            },
            set(newVal) {

                if(newVal === val) {//设置的值跟以前的一样

                    return
                }


                val = newVal;//如果以后再获取值的时候，将刚才设置的值丢回去
                observer(newVal);

                dep.notify();//让所有watcher的update方法执行
            }
        })
    }
}

//编译模板
function Compile(el, vm) {

    //el表示替换的范围
    vm.$el = document.querySelector(el);

    let fragment = document.createDocumentFragment();

    while (child = vm.$el.firstChild) {//将页面中app中的内容移入到内存中

        fragment.appendChild(child);
    }

    replace(fragment);

    function replace(fragment) {

        Array.from(fragment.childNodes).forEach(function (node) {//循环每一个节点

            let text = node.textContent;

            let reg = /\{\{(.*)\}\}/;

            //表示是文本节点，并且有指定的正则内容
            if(node.nodeType === 3 && reg.test(text)) {

                let arr = RegExp.$1.split('.');//[a,a]

                //用到了一个小技巧
                let val = vm;
                arr.forEach(function (k) {//取this.a.a
                    val = val[k]
                })

                new Watcher(vm, RegExp.$1, function (newVal) {//通过表达式拿到模型里面最新的数据

                    // console.log(2222, newVal)
                    node.textContent = text.replace(/\{\{(.*)\}\}/, newVal);
                })

                node.textContent = text.replace(/\{\{(.*)\}\}/, val);

            }

            //是元素节点
            if(node.nodeType === 1) {

                let nodeAttrs = node.attributes;//获取dom上面所有的属性,是一个类数组，可以转换成数组;遍历可以通过name获取到属性名称

                Array.from(nodeAttrs).forEach(function (attr) {

                    // console.log(attr.name,':', attr.value)
                    let name = attr.name;
                    let exp = attr.value;
                    //type='text'
                    //v-model='b'
                    // console.log(name)
                    if(name.indexOf('v-') > -1) {//表示是v-model

                        node.value = vm[exp]
                    }

                    //添加watcher，当数据发生变化的时候，更改视图
                    new Watcher(vm, exp, function (newVal) {
                        node.value = vm[exp]
                    })

                    //添加事件，当视图发生变化的时候，更改数据
                    node.addEventListener('input', function (e) {

                        let newVal = e.target.value;

                        vm[exp] = newVal//会触发表达式的set方法，从而触发发布消息，执行所有的watcher里面的update
                    })
                })
            }

            if(node.childNodes) {

                replace(node)
            }
        })
    }



    vm.$el.appendChild(fragment);
}


//发布订阅
function Dep() {

    this.subs = [];
}

//订阅
Dep.prototype.addSub = function (fn) {
    console.log(this.subs)
    this.subs.push(fn)
}

Dep.prototype.notify = function () {

    // console.log(this.subs,'subs')
    this.subs.forEach(sub => sub.update())
}

//watch
function Watcher(vm, exp, fn) {

    this.fn = fn;
    this.vm = vm;
    this.exp = exp;
    Dep.target = this;
    let val = vm;
    let arr = exp.split('.'); //this.a.a

    arr.forEach(function (k) {
        val = val[k]
    })

    Dep.target = null;
}

Watcher.prototype.update = function () {


    let val = this.vm;
    let arr = this.exp.split('.');
    arr.forEach(function (k) {
        val = val[k];
    })

    //val就是拿到最新的值
    this.fn(val)
}







