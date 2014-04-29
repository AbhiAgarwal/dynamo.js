'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
dynamo.twitterAuth(function(token, tokenSecret, profile, done) {
    console.log(token);
    done(null, null);
});

// Run
dynamo.run();
