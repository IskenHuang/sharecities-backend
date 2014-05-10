var passport    = require('passport');

/**
 *  should be handle case
 *
 *  case1
 *      aaa@aaa.com registered slidenote by local [server created account]
 *                  v
 *      aaa@aaa.com registered at github.com
 *                  v
 *      aaa@aaa.com used github.com login(SSO) slidenote
 *                  v                           v
 *        (x)show error message          integrted account(slidenote & github.com)
 *                                              v                           v
 *                     login slidenote by local(email & pw)             SSO by github.com
 *
 *  case2
 *      bbb@bbb.com registered at github
 *                  v
 *      bbb@bbb.com used github.com login(SSO) slidenote [server created account]
 *                  v
 *      bbb@bbb.com want to integrted other account [google.com]
 *                  v                            v
 *      SSO by google.com                SSO by github.com
 *
 *
 *      ps. user can't not change password. user doesn't have password
 */

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    delete user.sso;
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findOne(user.id).done(function (err, user) {
        done(err, user);
    });
});
