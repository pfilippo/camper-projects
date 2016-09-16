var http = require('http');

function parse(headers) {
    var resp = {};
    resp.ip = headers['x-forwarded-for'];
    resp.language = headers['accept-language'].substring(0,5);
    resp.os = headers['user-agent'].match(/\((.+?)\)/,"")[1];
    return resp;
}

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })  
  res.end(JSON.stringify(parse(req.headers)));

}).listen(process.env.PORT); 