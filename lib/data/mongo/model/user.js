/**
 * A model for our user
 */
'use strict';

var mongoose = require('mongoose');

var userModel = function () {
    var userSchema = mongoose.Schema({
        name: String,
        twitter: {
            userName: {
                type: String,
                lowercase: true
            },
            id: {
                type: String,
                unique: true
            },
            location: String,
            description: String,
            url: String,
            time_zone: String,
            experience : {
                profile_image_url: String,
                profile_background_color: String,
                profile_link_color: String,
                profile_sidebar_border_color: String,
                profile_sidebar_fill_color: String,
                profile_text_color: String
            }
        }
    });

    userSchema.pre('save', function (next) {
        var user = this;
        next();
    });

    userSchema.statics.create = function (profile) {
        var User = mongoose.model('User');
        var newUser = new User({
            name: profile.name,
            twitter: {
                userName: profile.screen_name,
                id: profile.id_str,
                location: profile.location,
                description: profile.description,
                url: profile.url,
                time_zone: profile.time_zone,
                experience : {
                    profile_image_url: profile.profile_image_url,
                    profile_background_color: profile.profile_background_color,
                    profile_link_color: profile.profile_link_color,
                    profile_sidebar_border_color: profile.profile_sidebar_border_color,
                    profile_sidebar_fill_color: profile.profile_sidebar_fill_color,
                    profile_text_color: profile.profile_text_color
                }
            }
        })
        newUser.save();
        return newUser;
    };

    return mongoose.model('User', userSchema);
};

module.exports = new userModel();
