'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
dynamo.route('/', function(req, res) {
    res.render('dust-example', {
        title: 'Dynamo',
        info: 'hello'
    });
});

// Run
dynamo.run();
