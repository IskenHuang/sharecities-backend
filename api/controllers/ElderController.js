/**
 * ElderController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	search: function(req, res) {
        sails.log.info('ElderController search req.query = ', req.query);
        var params = req.query || {},
            defautls = {
                tags: '',
                keyword: '',
                latitude: 25.040622,
                longitude: 121.5375365,
                scope: 10000, // m
            },
            getKeywordRegExp = function(keyword) {
                var keywordArrray = keyword.split(/\,/g),
                    _regex = '(' + keywordArrray.join('|') + ')';

                if(!keywordArrray.length) {
                    _regex = '.*';
                }

                console.log('_regex = ', _regex);
                return new RegExp( _regex, 'i');
            },
            getTags = function(tagString) {
                var tags = tagString.split(/\,/ig);

                return tags;
            },
            getLatitude = function(latitude, scope) {
                return {
                    '$gte': latitude - scope,
                    '$lt': latitude + scope,
                };
            },
            getLongitude = function(longitude, scope) {

                return {
                    '$gte': longitude - scope,
                    '$lt': longitude + scope,
                };
            };

        params = _.extend(defautls, params);
        params.latitude = parseFloat(params.latitude);
        params.longitude = parseFloat(params.longitude);
        params.scope = params.scope / 100000;
        console.log('params = ', params);

        console.log('getLatitude( params.latitude, params.scope) = ', getLatitude( params.latitude, params.scope));

        Elder.find({
            or: [
                {
                    name: getKeywordRegExp(params.keyword),
                },
                {
                    description: getKeywordRegExp(params.keyword),
                },
                {
                    tags: getTags(params.tags),
                },
                // {
                //     latitude: getLatitude( params.latitude, params.scope),
                //     longitude: getLongitude( params.longitude, params.scope),
                // },
            ],
            latitude: getLatitude( params.latitude, params.scope),
            longitude: getLongitude( params.longitude, params.scope),
            sort: 'updatedAt DESC'
        }).then(function(elders) {
            return res.json(elders);
        }).fail(function(e){
            return res.json(e);
        });
    },
};
