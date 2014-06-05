var express  = require('express'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

var app = express();
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({userName: username}).exec(function(err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function(user, done) {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user) {
        console.log('finding one..');
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});



require('./server/config/express')(app, passport, config);
require('./server/config/routes')(app, passport);

app.listen(config.port);
console.log('Listening to port ' + config.port + '..');