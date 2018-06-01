let str = `<a href="http://www.xinhuanet.com/politics/2018-05/31/c_1122920696.htm" target="_blank" mon="r=1">硬实力软实力 归根到底要靠人才实力</a><a href="http://www.xinhuanet.com/politics/2018-05/31/c_1122920696.htm" target="_blank" mon="r=1">硬实力软实力 归根到底要靠人才实力</a>`

let reg = /<a href="(.+?)".+?>([\s\S]+?)<\/a>/g;
// let reg = /a/g;

// str = str.match(reg)
str.replace(reg, function(matched, url, title) {

    console.log(matched)
    console.log(url)
    console.log(title)
})

console.log(str)