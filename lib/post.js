#!/usr/bin/env node

var request = require('request'),
    util = require('util'),
    fs = require('fs');
    helpers = require('./helpers')

//  Tistory /post/ documentationkey: "value", 
//  http://www.tistory.com/guide/api/post.php

function Post(tistoryObj) {
    this.parser = tistoryObj.parser;
    this.baseurl = tistoryObj.baseurl;
    this.params = {
        access_token: tistoryObj.access_token,
        format: tistoryObj.format
    }

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
        params = util._extend(params, this.params);
        params['targetUrl'] = helpers.fixTargetUrl(params['targetUrl']);

        if ('uploadedfile' in params)
            params['uploadedfile'] = fs.createReadStream(params['uploadedfile']);

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
