var _environment = require('./local').environment.toLowerCase();

module.exports.passport = {
    getConfig: function() {
        var envArray = [
            'development',
            'testing',
            'production',
        ];
        if(envArray.indexOf(_environment) < 0) {
            _environment = 'development';
        }

        return this[_environment];
    },
    development: {
        github: {
            clientID: '0b220a8d460ff014b8ab',
            clientSecret: '0022bbbc8869f885f0888d0151993cfe1c91db2f',
            callbackURL: '/api/auth/github'
        },
        facebook: {
            clientID: '200890606762386',
            clientSecret: '85731a0a7061569187007576aefe10af',
            callbackURL: '/api/auth/facebook'
        },
        foursquare: {
            clientID: 'XQVYOP3TELF5LVUPVWYAIMZ13LSZXX23E5GB4MIIILASBYJX',
            clientSecret: 'TIKPIMMDSHJ2IIAGOXEC2F0FWG4UB3S0WCBQAWBK5W3VD3EM',
            callbackURL: '/api/auth/foursquare'
        },
        twitter: {
            consumerKey: 'pFw4bxhe68uTasJgSrz0Kg',
            consumerSecret: '7aNU0agAukTYGLahSTvhanD49IDYJzbOCjn24ZdQTiM',
            callbackURL: '/api/auth/twitter'
        }
    },
    production: {
        github: {
            clientID: '7eb7e49239bf557db90d',
            clientSecret: '79faee1343ded62403a4a3dadba98118b4fb9884',
            callbackURL: '/api/auth/github'
        },
        facebook: {
            clientID: '210904502414055',
            clientSecret: 'fe33dfb170b2f8512b6130e8e6bf3a36',
            callbackURL: '/api/auth/facebook'
        },
        foursquare: {
            clientID: 'XQVYOP3TELF5LVUPVWYAIMZ13LSZXX23E5GB4MIIILASBYJX',
            clientSecret: 'TIKPIMMDSHJ2IIAGOXEC2F0FWG4UB3S0WCBQAWBK5W3VD3EM',
            callbackURL: '/api/auth/facebook'
        },
        twitter: {
            consumerKey: 'JDegsXxLXi6mf3YjyFslA',
            consumerSecret: 'Beo2sgteubVpMwNp1VmYxhM6qYK55teY3MMYIpht25k',
            callbackURL: '/api/auth/twitter'
        }
    },
    testing: {
        github: {
            clientID: '59d63653fe0bba0eda02',
            clientSecret: 'dfa9d0350bc547c69c3b5c131ef8e5513e0241f2',
            callbackURL: '/api/auth/github'
        },
        facebook: {
            clientID: '235657909928981',
            clientSecret: '7f72be88f72777d84986f5b299241a03',
            callbackURL: '/api/auth/facebook'
        },
        foursquare: {
            clientID: 'XQVYOP3TELF5LVUPVWYAIMZ13LSZXX23E5GB4MIIILASBYJX',
            clientSecret: 'TIKPIMMDSHJ2IIAGOXEC2F0FWG4UB3S0WCBQAWBK5W3VD3EM',
            callbackURL: '/api/auth/facebook'
        },
        twitter: {
            consumerKey: 'Lo2CCNYocQN4zrwb4AkCqw',
            consumerSecret: '9hIvweaG4DZfKJ37b5lAFXB16aX5Lh5984lL4s4G8',
            callbackURL: '/api/auth/twitter'
        }
    }
};
