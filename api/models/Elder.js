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
        var randomArray = [
                '臺北市北投區石牌路2段201號',
                '110台北市永吉路278巷42弄13號',
                '台北市遼寧街65-81號',
                '106台北市大安區忠孝東路三段44號',
                '100杭州南路一段8號',
                '台北市中山區雙城街10號之1',
                '116興隆路四段105巷1號4樓',
            ],
            randomlimit = randomArray.length;
            randomNumber = Math.round(Math.random(0,randomlimit) * 10);

        elder.address = randomArray[randomNumber];

        cb(null, elder);
    },
};

