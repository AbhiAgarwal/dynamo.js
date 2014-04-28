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
    nconf = require('nconf');

/* Support Functions */
var loadConfiguration = function(){
    var database = 'development.json';
    if(nconf.get('NODE_ENV') === 'production'){
        database = 'production.json';
    }
    nconf.argv().env().file({ file: (__dirname + '/app/' + database ) });
};

/* Dynamo Export Functionality */
var dynamo = exports;

dynamo.route = function(path, current){
    app.get(path, current);
};

dynamo.run = function(){
    loadConfiguration();
    var server = app.listen(nconf.get('port'), function() {
        console.log('Listening on port %d', server.address().port);
    });
};
