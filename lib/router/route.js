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

var dynamo = require('../core'),
    POSTR = {},
    GETR = {};

/*
 * Removal of routes is simpler
 * We want to keep only one iteration of one path
 @param url: path to remove
 */
var removeGetRoute = function(url) {
    for (var i = dynamo.app.routes.get.length - 1; i >= 0; i--) {
        if (dynamo.app.routes.get[i].path === url) {
            dynamo.app.routes.get.splice(i, 1);
        }
    }
};

var removePostRoute = function(url) {
    for (var i = dynamo.app.routes.post.length - 1; i >= 0; i--) {
        if (dynamo.app.routes.post[i].path === url) {
            dynamo.app.routes.post.splice(i, 1);
        }
    }
};

dynamo.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

// needs to decide
// 'get' -> GET REQUEST
// 'post' -> POST REQUEST
// 'auth' -> AUTHENTICATION REQUEST
dynamo.route = function(typeofRequest, path, current) {
    if (typeofRequest === 'get') {
        if (typeof dynamo.app.routes.get === 'undefined') {
            GETR[path] = 1;
            dynamo.app.get(path, current);
        } else {
            if (GETR[path] === 1) {
                removeGetRoute(path);
            }
            dynamo.app.get(path, current);
        }
    } else if (typeofRequest === 'auth') {
        if (typeof dynamo.app.routes.get === 'undefined') {
            GETR[path] = 1;
            dynamo.app.get(path, dynamo.ensureAuthenticated, current);
        } else {
            if (GETR[path] === 1) {
                removeGetRoute(path);
            }
            dynamo.app.get(path, dynamo.ensureAuthenticated, current);
        }
    } else if (typeofRequest === 'post') {
        if (typeof dynamo.app.routes.post === 'undefined') {
            POSTR[path] = 1;
            dynamo.app.post(path, current);
        } else {
            if (POSTR[path] === 1) {
                removePostRoute(path);
            }
            dynamo.app.post(path, current);
        }
    }
};
