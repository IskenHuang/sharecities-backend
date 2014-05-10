/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

var Q = require('q');

// var data = require('./../assets/opendata/coeat.json');

module.exports.bootstrap = function (cb) {
    // var results = [];
    // _.each(data, function(obj) {
    //     results.push(sails.services.geocoder.geocoder(obj['據點名稱']))
    // });

    // Q.all(results).spread(function(){
    //     // console.log('a = ', a);
    //     _.each(arguments, function(aa){
    //         console.log('aa = ', aa.results);
    //         if(aa.results.length) {
    //             console.log('aa.results[0].geometry = ', aa.results[0].geometry);
    //         }
    //     });
    // });

    // It's very important to trigger this callack method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};