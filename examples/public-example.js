'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize();

// Router
dynamo.route('/', function (req, res) {
    res.render('index', {
        title: 'Hello, World'
    });
});

// Run
dynamo.run();
