var passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt      = require('bcrypt');

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
    function(account, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username. If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message. Otherwise, return the
            // authenticated `user`.
            User.findOne({
                account: account
            }).done(function(err, user) {
                if (err) {
                    return done(null, err);
                }

                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + account });
                }

                user.lastLogin = new Date();
                user.save(function(err){

                });

                bcrypt.compare(password, user.password, function(err, res) {
                    if (!res) {
                        return done(null, false, { message: 'Invalid Password'});
                    }

                    return done(null, user, { message: 'Logged In Successfully'} );
                });
            });
        });
    }
));
