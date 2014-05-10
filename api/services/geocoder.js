'use strict';

var Q = require('q'),
    geocoder = require('geocoder');

module.exports = {
    // Geocoding
    geocoder: function(address) {
        var deferred = Q.defer();

        geocoder.geocode( address, function ( err, data ) {
            // do stuff with data
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
        }, { language: 'zh-TW' });

        return deferred.promise;
    },

    reverseGeocode: function(latitude, longitude) {
        var deferred = Q.defer();

        geocoder.reverseGeocode( latitude, longitude, function ( err, data ) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
        }, { language: 'zh-TW' });

        return deferred.promise;
    },
};

