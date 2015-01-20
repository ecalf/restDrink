　　var http = require("http"); 
var fs = require('fs'); 
var url = require('url'); 
exports.start = function(){ 
http.createServer(function(request, response) { 
console.log(request.url)
var pathname = url.parse(request.url).pathname; 
var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名 
switch(ext){ 
case ".css": 
case ".js": 
fs.readFile("."+request.url, 'utf-8',function (err, data) {//读取内容 
if (err) throw err; 
response.writeHead(200, { 
"Content-Type": { 
".css":"text/css", 
".js":"application/javascript", 
}[ext] 
}); 
response.write(data); 
response.end(); 
}); 
break; 
default: 
fs.readFile('./view/index.html', 'utf-8',function (err, data) {//读取内容 
if (err) throw err; 
response.writeHead(200, { 
"Content-Type": "text/html" 
}); 
response.write(data); 
response.end(); 
}); 
} 
}).listen(8888); 
console.log("server start..."); 
} 