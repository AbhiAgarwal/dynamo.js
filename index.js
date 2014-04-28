'use strict';

var dynamo = require('./lib/core');

// Router
dynamo.route('/', function(req, res){
    res.send('hello world');
});

// Run
dynamo.run();
