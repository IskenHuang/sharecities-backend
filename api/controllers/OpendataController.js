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
    coeat = require('./../../assets/opendata/coeat.json');


module.exports = {
	coeat: function (req, res) {

        return res.json(coeat);
    }
};
