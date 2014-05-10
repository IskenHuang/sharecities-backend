var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    _config = require('../../config/passport').passport.getConfig().facebook;

module.exports = function(){
    passport.use(new FacebookStrategy({
            clientID: _config.clientID,
            clientSecret: _config.clientSecret,
            callbackURL: _config.callbackURL
        }, function (token, tokenSecret, profile, done) {
            process.nextTick(function () {
                sails.log.debug('passport-facebook profile = ', profile);

                // check user account and sso id
                User.findOne({
                    account: profile.emails[0].value
                }).done(function (err, user) {
                    if (user) {
                        // update sso data
                        profile.tokenSecret = tokenSecret;
                        user.sso.facebook = profile;

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
                            var imgUrl = profile.profileUrl.replace('www.facebook.com', 'graph.facebook.com');
                            user.userImage = imgUrl + 'picture';
                        }

                        // update firstname and lastname
                        user.firstName = profile.first_name;
                        user.lastName = profile.last_name;

                        // update gender
                        user.gender = profile.gender;

                        // update locale
                        user.locale = profile.locale;

                        // update timezone
                        user.timezone = profile.timezone;

                        // save value
                        user.save(function(err){
                            return done(null, user);
                        });
                    } else {
                        var imgUrl = profile.profileUrl.replace('www.facebook.com', 'graph.facebook.com'),
                            _email = [];

                        for(var i in profile.emails){
                            _email.push(profile.emails[i].value);
                        }

                        profile.token = token;
                        profile.tokenSecret = tokenSecret;

                        User.create({
                            firstName: profile.first_name,
                            lastName: profile.last_name,
                            urlName: profile.username,
                            account: profile.emails[0].value,
                            password: 'ssopassword',
                            email: _email,
                            userImage: imgUrl + 'picture',
                            gender: profile.gender,
                            locale: profile.locale,
                            timezone: profile.timezone,
                            sso: {
                                facebook: profile
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
