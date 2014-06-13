dynamo
======

**About**

<p>A very rough version of what I think an ideal framework looks like to me. This will go through major changes as I start using it in my own projects, and to test out areas where the tools presented here will not work.</p>

**Aim**

<p>My aim is to create a framework that will allow me to create and implement projects faster, and with less boilerplate code. Things like OAuth, User Creation will be dealt with, and I will be able to get started a lot faster.</p>

<p>The things I think are essential are:</p>

+ Easy configuration
+ Easy database configuration
+ OAuth implemented and easy to use
+ Able to change routes during run-time

<p>I am still on an older version of Express, and using the old route patterns. This will remain the case for a while until I fully understand the new changes.</p>

**Some examples**

<p>Hello World</p>

```
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
```

<p>Twitter Auth</p>

```
'use strict';

var dynamo = require('../lib/core');

// Initialization
dynamo.initialize(__dirname);

// Router
// Callback: What happens when the user is NOT DEFINED.
// If the user IS DEFINED then it carries on with the redirect
dynamo.twitterAuth(function(token, tokenSecret, profile, done, User) {
    // User does not exist so we create a user
    // Just return NULL so user is not added
    // So we say we're done with the User
    done(null, User.create(profile));
});

// Run
dynamo.run();
```

There are more examples in the examples folder.
