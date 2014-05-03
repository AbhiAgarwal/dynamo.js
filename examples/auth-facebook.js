'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
// Callback: What happens when the user is NOT DEFINED.
// If the user IS DEFINED then it carries on with the redirect
dynamo.facebookAuth(function(token, tokenSecret, profile, done, User) {
    // User does not exist so we create a user
    // Just return NULL so user is not added
    // So we say we're done with the User
    done(null, User.create(profile));
});

// Run
dynamo.run();
