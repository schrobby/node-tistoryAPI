#!/usr/bin/env node

var request = require('request'),
    util = require('util'),
    helpers = require('./helpers')

//  Tistory /post/ documentationkey: "value", 
//  http://www.tistory.com/guide/api/post.php

function Post(tistoryObj) {
    this.access_token = tistoryObj.access_token;
    this.format = tistoryObj.format;
    this.baseurl = tistoryObj.baseurl;
    this.parser = tistoryObj.parser;

    this._requiredParams = {
        'write': ['title'],
        'modify': ['title', 'postId'],
        'read': ['postId'],
        'attach': ['uploadedfile'],
        'delete': ['postId']
    }
}

['list', 'write', 'modify', 'read', 'attach', 'delete'].forEach(function(type) {
    Post.prototype[type] = function(params, callback) {
        params['access_token'] = this.access_token;
        params['output'] = this.format;
        params['targetUrl'] = helpers.fixTargetUrl(params['targetUrl']);

        var url = util.format('%s/post/%s', this.baseurl, type);
        var cb = function(err, resp, body) {
            if (err) {
                callback.call(this, err);
                return;
            }                
            this.parser.parse(body, function(err, result) {
                callback.call(this, err, result);
            });
        }.bind(this);

        request.post(url, { form: params }, cb);
    }
});

module.exports = Post;
