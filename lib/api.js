#!/usr/bin/env node
var Post = require('./post');
    helpers = require('./helpers');

//  API Documentation:
//  http://www.tistory.com/guide/api/index

exports.Tistory = function (access_token, format) {
    this.baseurl = 'https://www.tistory.com/apis';
    this.access_token = access_token;
    this.format = format || 'xml';
    this.parser = new helpers.Parser(format);
    
    //TODO: add the rest of the api
    this.post = new Post(this);
    //this.blog = new Blog();
    //this.category = new Category();   
}
