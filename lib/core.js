/**
 * dynamo
 * http://github.com/abhiagarwal/dynamo
 *
 * Copyright 2014 Abhi Agarwal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
    app = express(),
    fs = require('fs'),
    nconf = require('nconf'),
    passport = require('passport'),
    twitterStrategy = require('passport-twitter').Strategy,
    facebookStrategy = require('passport-facebook').Strategy,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

/* Support Functions */
var loadConfiguration = function(){
    var database = 'development.json';
    if(app.get('env') === 'production'){
        database = 'production.json';
    } else {
        app.use(express.errorHandler());
    }
    nconf.argv().env().file({ file: (__dirname + '/app/' + database ) });
};

/* Dynamo Export Functionality */
var dynamo = exports;

dynamo.initialize = function(){
    loadConfiguration();
    app.configure(function() {
        app.use(bodyParser());
        app.use(cookieParser(nconf.get('cookieParser')));
        app.use(session());
    });
}

dynamo.route = function(path, current){
    app.get(path, current);
};

dynamo.twitterAuth = function(current){
    var oauth = nconf.get('oauth-twitter');
    passport.use(
        new twitterStrategy({
            consumerKey: oauth.key,
            consumerSecret: oauth.secret,
            callbackURL: nconf.get('baseURL') + oauth.callback
        }, function(token, tokenSecret, profile, done) {
            current(token, tokenSecret, profile, done);
        }
    ));
    dynamo.route(oauth.base, passport.authenticate('twitter'));
    dynamo.route(oauth.callback, passport.authenticate('twitter', {
        successRedirect: oauth.success,
        failureRedirect: oauth.failure
    }));
};

dynamo.facebookAuth = function(current){
    var oauth = nconf.get('oauth-facebook');
    passport.use(
        new facebookStrategy({
            clientID: oauth.id,
            clientSecret: oauth.secret,
            callbackURL: nconf.get('baseURL') + oauth.callback
        }, function(token, tokenSecret, profile, done) {
            current(token, tokenSecret, profile, done);
        }
    ));
    dynamo.route(oauth.base, passport.authenticate('facebook', {
        scope: 'read_stream'
    }));
    dynamo.route(oauth.callback, passport.authenticate('facebook', {
        successRedirect: oauth.success,
        failureRedirect: oauth.failure
    }));
};

dynamo.run = function(){
    var server = app.listen(nconf.get('port'), function() {
        console.log('Listening on port %d', server.address().port);
    });
};
