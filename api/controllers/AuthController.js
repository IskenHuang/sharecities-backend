/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

var passport = require('passport');

module.exports = {
    _config: {
        blueprints: {
            actions: true,
            shortcuts: true,
            rest: false
        }
    },

    /**
     * index
     *
     * auto redirect to signup
     *
     * @param  {Object} req request
     * @param  {Object} res response
     * @return {self}
     */
    index: function(req, res) {
        console.log('AuthController index begin');
        return sails.controllers.auth.signup(req, res);
    },

    /**
     * signin
     */
    signin: function(req, res) {
        console.log('AuthController signin begin');
        return sails.controllers.auth.login(req, res);
    },

    /**
     * login
     * @param {String} account set username as account. because passport local default
     * @param {String} redirect redirect to page, default is '/'
     */
    login: function(req, res) {
        console.log('AuthController login begin');
        /**
         * set username as account. because passport local default
         * @type {String}
         */
        var redirect = req.query.redirect || req.body.redirect;
        redirect = (redirect === undefined) ? '/' : redirect;

        req.body.username = req.body.account;

        passport.authenticate('local', function(err, user, info){
            if (err || !user) {
                if(err) {
                    return res.json(err);
                }else{
                    return res.json(info, 400);
                }
            }

            req.logIn(user, function(err){
                if (err) {
                    return res.json(err);
                }

                // return res.json(user);
                return res.redirect(redirect);
            });
        })(req, res);
    },

    /**
     * signout
     * @param  {Object} req expressjs default
     * @param  {Object} res expressjs default
     */
    signout: function(req,res) {
        console.log('AuthController signout begin');
        return sails.controllers.auth.logout(req, res);
    },

    /**
     * logout
     * @param  {Object} req expressjs default
     * @param  {Object} res expressjs default
     */
    logout: function(req,res) {
        console.log('AuthController logout begin');
        req.logout();
        // return res.json({
        //     message: 'logout successful'
        // });
        return res.redirect('/');
    },

    /**
     * signup
     *
     * if is existed user system will auto login.
     * if is not existed user will create new account and login.
     * account is email by default.
     *
     * @param  {Object} req expressjs default
     * @param  {Object} res expressjs default
     */
    signup: function(req, res) {
        console.log('AuthController signup begin');
        // TODO - if account is not email return 500

        // user is login
        if(req.isAuthenticated()){
            User.findOne(req.session.passport.user).done(function(err, user){
                if(err || !user){
                    return sails.config[400]( req, res, 10000, err);
                }

                return res.json(user);
            });
        }else{
            User.findOne({
                account: req.body.account
            }).done(function(err, user){
                if(user){
                    return sails.controllers.auth.login(req, res);
                }else{
                    User.create({
                        account: req.body.account,
                        password: req.body.password,
                        email: [req.body.account]
                    }).done(function(err, user){
                        if(err){
                            return sails.config[400]( req, res, 10002, err);
                        }

                        sails.logger( user, 'info');

                        return sails.controllers.auth.login(req, res);
                    });
                }
            });
        }
    },

    forgotPassword: function(req, res) {
        return res.redirect('/');
    },

    resetPassword: function(req, res) {
        return res.redirect('/');
    },

    github: function (req, res) {
        passport.authenticate('github', {
            failureRedirect: '/signin'
        }, function (err, user) {
            req.logIn(user, function (err) {
                if (err) {
                    return res.serverError(err);
                    // return sails.config['400'](req, res, 10006, err);
                }

                return res.redirect('/');
            });
        })(req, res);
    },

    facebook: function (req, res) {
        passport.authenticate('facebook', {
            failureRedirect: '/signin',
            scope: [
                'email',
                'publish_actions'
            ]
        }, function (err, user) {
            req.logIn(user, function (err) {
                if (err) {
                    return res.serverError(err);
                    // return sails.config['400'](req, res, 10007, err);
                }

                return res.redirect('/');
            });
        })(req, res);
    },

    foursquare: function (req, res) {
        sails.log.info('AuthController foursquare begin');
        passport.authenticate('foursquare', {
            failureRedirect: '/signin',
            // scope: [
            //     'email',
            //     'publish_actions'
            // ]
        }, function (err, user) {
            sails.log.debug('AuthController foursquare err = ', err);
            sails.log.debug('AuthController foursquare user = ', user);
            req.logIn(user, function (err) {
                sails.log.debug('AuthController foursquare logIn err = ', err);
                if (err) {
                    return res.serverError(err);
                    // return sails.config['400'](req, res, 10007, err);
                }

                return res.redirect('/');
            });
        })(req, res);
    },

    twitter: function (req, res) {
        passport.authenticate('twitter', {
            failureRedirect: '/signin'
        }, function (err, user) {
            req.logIn(user, function (err) {
                if (err) {
                    return res.serverError(err);
                    // return sails.config['400'](req, res, 10008, err);
                }

                return res.redirect('/');
            });
        })(req, res);
    }
};
