var passport = require('passport'),
    FoursquareStrategy = require('passport-foursquare').Strategy,
    _config = require('../../config/passport').passport.getConfig().foursquare;

module.exports = function(){
    passport.use(new FoursquareStrategy({
            clientID: _config.clientID,
            clientSecret: _config.clientSecret,
            callbackURL: _config.callbackURL
        }, function (token, tokenSecret, profile, done) {
            process.nextTick(function () {

                // check user account and sso id
                User.findOne({
                    account: profile.emails[0].value
                }).done(function (err, user) {
                    if (user) {
                        // update sso data
                        profile.token = token;
                        profile.tokenSecret = tokenSecret;
                        user.sso.github = profile;

                        // update lastLogin
                        user.lastLogin = new Date();

                        // update emails
                        for(var i in profile.emails){
                            if(user.email.indexOf(profile.emails[i].value) < 0){
                                user.email.push(profile.emails[i].value);
                            }
                        }

                        // update profile image
                        if(user.userImage === 'https://lh6.googleusercontent.com/zp85XTnogqt10OZOGE8-xe6WIJjydHnpp35Z7hXqLXeS=s712-no') {
                            user.userImage = profile._json.response.user.photo.prefix + '300x300' + profile._json.response.user.photo.suffix;
                        }

                        // update firstname and lastname
                        user.firstName = profile.name.givenName;
                        user.lastName = profile.name.familyName;

                        // save value
                        user.save(function(err){
                            return done(null, user);
                        });
                    } else {

                        profile.token = token;
                        profile.tokenSecret = tokenSecret;

                        User.create({
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            urlName: 'https://foursquare.com/user/' + profile.id,
                            account: profile.emails[0].value,
                            password: 'ssopassword',
                            email: profile.emails[0].value,
                            userImage: profile._json.response.user.photo.prefix + '300x300' + profile._json.response.user.photo.suffix,
                            sso: {
                                foursquare: profile
                            },
                            lastLogin: new Date()
                        }).done(function (err, user) {
                            return done(err, user);
                        });
                    }
                });
            });
        }
    ));
};
