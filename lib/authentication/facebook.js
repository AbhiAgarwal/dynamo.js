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

var nconf = require('nconf');

var passport = require('passport'),
    facebookStrategy = require('passport-facebook')
    .Strategy,
    dynamo = require('../core');

module.exports = function (current) {
    var oauth = nconf.get('oauth-facebook');
    passport.use(
        new facebookStrategy({
            clientID: oauth.id,
            clientSecret: oauth.secret,
            callbackURL: nconf.get('baseURL') + oauth.callback
        }, function (token, tokenSecret, profile, done) {
            current(token, tokenSecret, profile, done);
        }));
    dynamo.route(oauth.base, passport.authenticate('facebook', {
        scope: 'read_stream'
    }));
    dynamo.route(oauth.callback, passport.authenticate('facebook', {
        successRedirect: oauth.success,
        failureRedirect: oauth.failure
    }));
};
