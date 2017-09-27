var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello world!');
})

var server = app.listen(5555,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('正在监视'+port+'端口');
    console.log('当前电脑地址为 http://%s:%s:',host,port);
})