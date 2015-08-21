var http = require('http');
var url = require('url');
//http.Server 是一个基于事件的 HTTP 服务器，所有的请求都被封装为独立的事件
//开发者只需要对它的事件编写响应函数即可实现 HTTP 服务器的所有功能。它继承自EventEmitter
//http://blog.csdn.net/gxhacx/article/details/12433285
var server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); //安全性？用。http://localhost:63342
    var path = url.parse(req.url, true);
    if (req.method === 'GET') {  //对GET 参数会放在url后面
        console.log('get:'+path.query.myArg);
        res.end((Number(path.query.myArg)+1).toString());
    }
    //对于POST
    //http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作，譬如上传文件。
    // 而很多时候我们可能并不需要理会请求体的内容，恶意的 POST请求会大大消耗服务器的资源。
    // 所以 Node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
    var querystring = require('querystring');
    var post = '';
    req.on('data', function (chunk) { //过来的data会变成 a=2 这样的字符串
        post += chunk;
    });
    req.on('end', function () {
        if(post) console.log('post:'+post);
        post = querystring.parse(post);
        res.end((Number(post.myArg) + 2).toString());
    });
    //console.log(path.pathname); //这句不要删掉 时刻知道页面的请求
}).listen(3000, 'localhost', function () {
    console.log('server listening on port 3000');
});

