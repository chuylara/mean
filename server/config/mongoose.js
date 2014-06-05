var mongoose = require('mongoose');

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
        userName: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length == 0)
        {
            User.create( {firstName: 'Chuy', lastName: 'Lara', userName: 'chuy' })
            User.create( {firstName: 'Leo', lastName: 'Lara', userName: 'leo' })
            User.create( {firstName: 'Lucian', lastName: 'Lara', userName: 'lucian' })
        }
    })
}
