var express  = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// express
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

// mongoose + mongodb configuration
if (env == 'development') {
    mongoose.connect('mongodb://localhost/mean');
} else {
    mongoose.connect('mongodb://test:test@ds051858.mongolab.com:51858/heroku_app25946336');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('database opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});

// routing
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage : mongoMessage });
});

var port = process.env.PORT || 1234;
app.listen(port);
console.log('Listening to port ' + port + '..');