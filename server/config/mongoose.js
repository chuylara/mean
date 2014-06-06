var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('database opened');
    });

    mongoose.connect(config.db);

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length == 0)
        {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'chuy');
            User.create( {firstName: 'Chuy', lastName: 'Lara', userName: 'chuy', salt: salt, hashed_pwd: hash });

            salt = createSalt();
            hash = hashPwd(salt, 'leo');
            User.create( {firstName: 'Leo', lastName: 'Lara', userName: 'leo', salt: salt, hashed_pwd: hash });

            salt = createSalt();
            hash = hashPwd(salt, 'lucian');
            User.create( {firstName: 'Lucian', lastName: 'Lara', userName: 'lucian', salt: salt, hashed_pwd: hash });
        }

    })
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);

    return hmac.update(pwd).digest('hex');
}

