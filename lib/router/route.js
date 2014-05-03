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

var dynamo = require('../core');

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

module.exports = function(path, current) {
    if (typeof dynamo.app.routes.get === 'undefined') {
        dynamo.app.get(path, current);
    } else {
        removeGetRoute(path);
        dynamo.app.get(path, current);
    }
};
