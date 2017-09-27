var fs = require('fs');
fs.readFile('node笔记.txt','utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
})
console.log('end.');