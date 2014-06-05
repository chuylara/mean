var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/mean',
        rootPath: rootPath,
        port: process.env.PORT || 1234
    },
    production: {
        db: 'mongodb://test:test@ds051858.mongolab.com:51858/heroku_app25946336',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}