'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
dynamo.route('get', '/', function(req, res) {
    res.render('public-example', {
        title: 'Dynamo',
        info: 'hello'
    });
});

// Run
dynamo.run();
