//发布订阅模式， 相当于是有一段代码订阅了某个消息，有一段代码发布了某个消息，先订阅再发布

//发布订阅
function Dep() {

    this.subs = [];
}

//订阅
Dep.prototype.addSub = function (fn) {

    this.subs.push(fn)
}

Dep.prototype.notify = function () {

    this.subs.forEach(sub => sub.update())
}

//watch
function Watcher(fn) {
    this.fn = fn
}

Watcher.prototype.update = function () {

    this.fn()
}

let watch1 = new Watcher(function () {

    console.log(11)
})
let watch2 = new Watcher(function () {

    console.log(11)
})


let dep = new Dep();

dep.addSub(watch1);
dep.addSub(watch2);

console.log(dep.subs);