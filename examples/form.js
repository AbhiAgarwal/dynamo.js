'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
// This particular dust file includes a '_csrf' field within it.
// You can enable/disable in the development.json file & read upon it.
dynamo.route('get', '/', function(req, res) {
    res.render('form-example');
});

// Post Form
// Gets the values of the inputs from the particular files.
dynamo.route('post', '/submitForm', function(request, response, next) {
    console.log(request.body.user.name);
    console.log(request.body.user.email);
    next();
});

// Run
dynamo.run();
