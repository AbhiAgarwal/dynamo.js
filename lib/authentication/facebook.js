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
    dynamo = require('../core'),
    User = require('../data/mongo/model/facebookuser');

dynamo.facebookAuth = function(current) {
    var oauth = nconf.get('oauth-facebook');
    passport.use(
        new facebookStrategy({
            clientID: oauth.id,
            clientSecret: oauth.secret,
            callbackURL: nconf.get('baseURL') + oauth.callback
        }, function(token, tokenSecret, profile, done) {
            //Retrieve the user from the database by login
            User.findOne({
                'facebook.id': profile._json.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return current(token, tokenSecret, profile._json, done, User);
                }
                done(null, user);
            });
        }));

    dynamo.route('get', oauth.base, passport.authenticate('facebook', {
        scope: 'read_stream'
    }));

    dynamo.route('get', oauth.callback, passport.authenticate('facebook', {
        successRedirect: oauth.success,
        failureRedirect: oauth.failure
    }));

    dynamo.route('get', '/facebook/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, function(err, user) {
            done(null, user);
        });
    });
};

exports.injectUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        require.resolve(request);es.redirect(_getRedirect(req));
    }
};

