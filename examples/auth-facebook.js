'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize();

// Router
dynamo.facebookAuth(function(token, tokenSecret, profile, done){
    console.log(token);
    done(null, null);
});

// Run
dynamo.run();
