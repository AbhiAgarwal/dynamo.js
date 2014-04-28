'use strict';

var dynamo = require('./lib/core');

dynamo.run();
dynamo.route('/', function(req, res){res.send('hello world');});
