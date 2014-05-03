/**
 * A model for our user
 */
'use strict';

var mongoose = require('mongoose');

var userModel = function() {
    var userSchema = mongoose.Schema({
        name: String,
        facebook: {
            id: {
                type: String,
                unique: true
            },
            link: String,
            gender: String,
            timezone: Number,
            verified: Boolean,
            locale: String
        }
    });

    userSchema.pre('save', function(next) {
        var user = this;
        next();
    });

    userSchema.statics.create = function(profile) {
        var User = mongoose.model('FacebookUser');
        var newUser = new User({
            name: profile.name,
            facebook: {
                id: profile.id,
                link: profile.link,
                gender: profile.gender,
                timezone: profile.timezone,
                verified: profile.verified,
                locale: profile.locale
            }
        });
        newUser.save();
        return newUser;
    };

    return mongoose.model('FacebookUser', userSchema);
};

module.exports = new userModel();
