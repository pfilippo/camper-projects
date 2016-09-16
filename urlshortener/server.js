'use strict';
var koa = require('koa');
var mongo = require('koa-mongo');
var page = require('./page');
var app = koa();

app.use(mongo({uri: 'mongodb://localhost:27017/test'}));

app.use(function *(next){
    if (this.request.path !== '/') return yield next;
    this.body = page; 
});

app.use(function *(next){
    var r = new RegExp("^/new");
    if (!this.path.match(r)) return yield next;
    var url = this.path.substr(5);
    if (isValidUrl(url)) {
        var urls = this.mongo.db('test').collection('urls');
        var count = this.mongo.db('test').collection('counts');
        var num = yield urls.findOne({'url': url});
        if (!num) {
             var inc = yield count.findAndModify({ _id: 'urls'},[],  { $inc: { seq: 1 } }, { upsert:true, new: true});
             num = inc.value.seq.toString();
             yield urls.insert({ 'url': url, 'num': num});    
        }
        else num = num.num;
        this.body = {'original_url': url, 'short_url': 'https://camper-api-projects-pfilippo.c9users.io/'+num};
    }
    else this.body = {'error': 'invalid URL. Url must be like http://www.exitexample.com'};
});

app.use(function *(next){
    yield next;
    var url = yield this.mongo.db('test').collection('urls').findOne({'num': this.path.substr(1)});
    if (url) this.redirect(url.url);
    else this.body= {"error":"This url is not in the database."};
});

function isValidUrl(u) {
    var pattern = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
    return pattern.test(u);
}

app.listen(8080);
