/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var Q = require('q');

module.exports = {
    index: function(req, res) {
        return res.redirect('/api/user/me');
    },

    me: function(req, res) {
        var _userId = req.session.passport.user.id;

        return Q.all([
            User.findOne(_userId),
            // Slide.find({
            //     userId: _userId
            // })
        ]).spread(function(slides){
            return res.json({
                user: req.session.passport.user,
                slides: slides
            });
        }).fail(function(err){
            return res.json(err);
        });
    }
};
