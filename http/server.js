var http =require('http');

http.createServer(function(req,res) {
console.log(req.headers);
//res.setHeader('Content-Type','image/apng');
res.setHeader('Set-Cookie',['a=b','c=d']);

res.statusCode = 403;
res.statusMessage = 'no res';

res.end('<h1>hello world </h1>');
}).listen('8080');