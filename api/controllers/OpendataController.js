/**
 * OpendataController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

'use strict';

var Config = {
    opendata: __dirname + '/../../assets/opendata',
};

var CSV = require('csv'),
    FS = require('fs'),
    request = require('request'),
    coeat = require('./../../assets/opendata/coeat.json'),
    taipeiHospital = require('./../../assets/opendata/taipeiHospital.json');


module.exports = {
    index: function(req, res) {
        return res.json({
            'food': coeat,
            'hospital': taipeiHospital,
        });
    },
	coeat: function (req, res) {

        return res.json(coeat);
    },
    hospital: function(req, res) {
        return res.json(taipeiHospital);
    },
};
