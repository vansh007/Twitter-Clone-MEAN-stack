var express = require('express')
  , index = require('./routes/index')
  , user = require('./routes/user')
  , followers = require('./routes/followers')
  , feeds = require('./routes/feeds')
  
  , http = require('http')
  , path = require('path');

var mongoSessionConnectURL = "mongodb://localhost:27017/twitter_db";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  
	saveUninitialized: false,	
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);
app.post('/login', user.login);
app.post('/logout', index.logout);
app.post('/signUp', user.signup);
app.get('/home', index.home);
app.get('/about', index.about);
app.get('/contactInfo', index.contactInfo);
app.get('/workedu', index.workEduInfo);
app.get('/followers', index.followers);
app.post('/aboutUpdate', user.user_about_update); 
app.post('/aboutGet', user.user_about_get); 
app.post('/userOps', followers.follower_operations);
app.post('/feedOps', feeds.feed_operations);

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Twitter server listening on port ' + app.get('port'));
	});  
});