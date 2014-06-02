var express  = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = new express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
app.use(express.static(__dirname + '/public'));
app.use(morgan());

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
})

app.get('*', function(req, res) {
    res.render('index');
});

var port = 1234;
app.listen(port);
console.log('Listening to port ' + port + '..');