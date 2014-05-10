/**
* Elder.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        description: {
            type: 'string',
            defaultsTo: ''
        },
        birthday: {
            type: 'datetime',
            defaultsTo: new Date('2000/1/1')
        },
        age: {
            type: 'integer',
            defaultsTo: 80
        },
        gender: {
            type: 'string',
            defaultsTo: 'man'
        },
        skills: {
            type: 'array',
            defaultsTo: [],
        },
        requirement: {
            type: 'array',
            defaultsTo: [],
        },
        latitude: {
            type: 'float',
            defaultsTo: 25.040622,
        },
        longitude: {
            type: 'float',
            defaultsTo: 121.5375365,
        },
        tags: {
            type: 'array',
            defaultsTo: []
        },
        getLocation: function() {
            return {
                latitude: this.latitude,
                longitude: this.longitude,
            };
        },
    },

    beforeCreate: function(elder, cb) {
        sails.log.info('beforeCreate elder = ', elder);
        cb(null, elder);
    },
};

