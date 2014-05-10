var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    _config = require('../../config/passport').passport.getConfig().github;

module.exports = function(){
    passport.use(new GitHubStrategy({
            clientID: _config.clientID,
            clientSecret: _config.clientSecret,
            callbackURL: _config.callbackURL
        }, function (token, tokenSecret, profile, done) {
            process.nextTick(function () {
                sails.log.debug('passport-github profile = ', profile);

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
                            user.userImage = profile._json.avatar_url;
                        }

                        // update firstname and lastname
                        if(user.firstname === '' && user.lastName === '') {
                            var _splitNameArray = profile.displayName.split(' ');
                            user.firstName = _splitNameArray[0];
                            user.lastName = _splitNameArray[1];
                        }

                        // save value
                        user.save(function(err){
                            return done(null, user);
                        });
                    } else {
                        var _splitNameArray = profile.displayName.split(' '),
                            _email = [];

                        for(var i in profile.emails){
                            _email.push(profile.emails[i].value);
                        }

                        profile.token = token;
                        profile.tokenSecret = tokenSecret;

                        User.create({
                            firstName: _splitNameArray[0],
                            lastName: _splitNameArray[1],
                            urlName: profile.username,
                            account: profile.emails[0].value,
                            password: 'ssopassword',
                            email: _email,
                            userImage: profile._json.avatar_url,
                            sso: {
                                github: profile
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
