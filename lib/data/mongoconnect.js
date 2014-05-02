/**
 * A custom library to establish a database connection
 */
'use strict';
var mongoose = require('mongoose');

var db = function() {
    return {
        /**
         * Open a connection to the database
         * @param conf
         */
        config: function(conf) {
            mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
            db.once('open', function callback() {
                console.log('MongoDB Online');
            });
        }
    };
};

module.exports = db();
