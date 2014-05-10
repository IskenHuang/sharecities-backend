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
    taipeiHospital = require('./../../assets/opendata/taipeiHospital.json'),
    toilet = require('./../../assets/opendata/toilet.json');


module.exports = {
    index: function(req, res) {
        return res.json({
            'food': coeat,
            'hospital': taipeiHospital,
            'toilet': toilet,
        });
    },
	coeat: function (req, res) {

        return res.json(coeat);
    },
    hospital: function(req, res) {
        return res.json(taipeiHospital);
    },
    toilet: function(req, res) {
        return res.json(toilet);
    }
};
