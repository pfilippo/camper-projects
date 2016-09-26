'use strict';
const koa = require("koa");
const multer = require('koa-multer');
const page = require("./page");

var app = koa();

app.use(multer()); 

app.use(function *(next){
    if (this.method !== 'GET') return yield next;
    this.body = page; 
});

app.use(function *(next){
    if (this.method !== 'POST') return yield next;  
    if (this.req.files.uf) this.body = {"size":this.req.files.uf.size};
    else this.body = {"error":"no files to process"};
});
    
app.listen(8080);