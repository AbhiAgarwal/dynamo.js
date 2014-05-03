'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
dynamo.route('get', '/', function(req, res) {
    res.send('hello world');
});

// Run
dynamo.run();
