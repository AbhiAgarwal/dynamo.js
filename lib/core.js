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
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    lusca = require('lusca'),
    session = require('express-session'),
    passport = require('passport'),
    cons = require('consolidate');

var twitterauthentication = require('./authentication/twitter'),
    facebookauthentication = require('./authentication/facebook'),
    router = require('./router/route');

var dataMongo = require('./data/mongoconnect');

var loadData = function() {
    if (nconf.get('db-choice') === 'mongo') {
        dataMongo.config(nconf.get('databaseConfig-mongo'));
    }
};

/* Support Functions */
var loadConfiguration = function(currentDirectory) {
    var database = 'development.json';
    if (app.get('env') === 'production') {
        database = 'production.json';
    } else {
        app.use(express.errorHandler());
    }
    nconf.argv()
        .env()
        .file({
            file: (currentDirectory + '/app/' + database)
        });
    loadData();
};

/* Dynamo Export Functionality */
var dynamo = exports;
dynamo.app = app;

dynamo.initialize = function(currentDirectory) {
    // load internal configuration
    loadConfiguration(currentDirectory);
    // load db
    dynamo.app.configure(function() {
        // express configuration
        dynamo.app.set('title', nconf.get('name'));
        dynamo.app.use(express.static(currentDirectory + nconf.get('publicFolder')));
        dynamo.app.use(cookieParser(nconf.get('cookieParser')));
        dynamo.app.use(bodyParser());
        dynamo.app.use(session());
        dynamo.app.use(passport.initialize());
        dynamo.app.use(passport.session());
        dynamo.app.engine('dust', cons.dust);
        dynamo.app.set('view engine', 'dust');

        // lusca - Application security
        // https://github.com/krakenjs/lusca
        var security = nconf.get('lusca');
        dynamo.app.use(lusca({
            csrf: security.csrf,
            csp: security.csp,
            xframe: security.xframe,
            p3p: security.p3p,
            hsts: {
                maxAge: security.hsts.maxAge,
                includeSubDomains: security.hsts.includeSubDomains
            },
            xssProtection: security.xssProtection
        }));
        dynamo.app.use(function(req, res, next) {
            res.locals.user = req.user;
            next();
        });
    });
};

dynamo.run = function() {
    var server = dynamo.app.listen(nconf.get('port'), function() {
        console.log('Listening on port %d', server.address()
            .port);
    });
};
