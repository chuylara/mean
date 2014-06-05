var express  = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function(app, passport, config) {

    function compile(str, path){
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));

    app.use(express.static(config.rootPath + '/public'));
    app.use(morgan());
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(session({secret: 'mean unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
};

