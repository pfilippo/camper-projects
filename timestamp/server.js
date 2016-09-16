var http = require('http');
var url = require('url');

function parsetime (time) {  
    if (isNaN(time)) {
        var rd = new Date(time);
    }
    else {
        var rd = new Date(time*1000);
    } 
    if (!isNaN(rd.getTime())) {
        return {
            unix: rd.getTime()/1000,
            natural: rd.toLocaleString("en-US", {month: 'long', day: 'numeric', year: 'numeric'})
        };
    }
    else 
        return {unix: null, natural: null}
}  
       
var server = http.createServer(function (req, res) {  
    var parsedUrl = url.parse(req.url, true);  
    var rq = parsedUrl.pathname.substring(1).replace(/%20/g, ' ').replace("favicon.ico","");
    if (rq.length>0) {
        res.writeHead(200, { 'Content-Type': 'application/json' })  
        res.end(JSON.stringify(parsetime(rq)));
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });  
        res.end('User stories:<br>\
                1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)<br>\
                2) If it does, it returns both the Unix timestamp and the natural language form of that date.<br>\
                3) If it does not contain a date or Unix timestamp, it returns null for those properties.<br>\
                Example usage:<br>\
                https://one-pfilippo.c9users.io/December%2015,%202015<br>\
                https://one-pfilippo.c9users.io/1450137600<br>\
                Example output:<br>\
                { "unix": 1450137600, "natural": "December 15, 2015 }');
    }
});  
server.listen(process.env.PORT);