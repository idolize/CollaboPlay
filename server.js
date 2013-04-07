var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy
, mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
		clientID: '488102791244387',
		clientSecret: 'fac3c20b3a436766c866c69ee3128275',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		// To keep the example simple, the user's Facebook profile is returned to
		// represent the logged-in user.  In a typical application, you would want
		// to associate the Facebook account with a user record in your database,
		// and return that user instead.
		return done(null, profile);
	}
));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('secretval'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/project', routes.project);
app.get('/account', ensureAuthenticated, routes.account);

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
});

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/');
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.get('/fileupload', ensureAuthenticated, routes.fileupload);
app.post('/upload', ensureAuthenticated, routes.upload);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/');
}

function initDatabase(){
	
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {});

	
	//newtrack.getTitle();
	var trackSchema;
	trackSchema = new mongoose.Schema({
		title:  String,
		creatorId: Number,
		description:   String,
		type: String,
		date: { type: Date, default: Date.now },
	});
	trackSchema.methods.getTitle = function(){
		console.log("Track #" + this.creatorId + " has the Title " + this.title);
	}

	var Track = mongoose.model('Track', trackSchema);

	var params = {title: "A Day in the Life Cover", type: "guitar", creatorId: 1, description: "A Cover of the Beatles song"};
	var newtrack = new Track(params);
	newtrack.save(function(err, newTrack){
		if (err){
			console.error(err.text);
		}
		//newTrack.getTitle();

	});
	
	

	var returnObject;
	Track.find({'creatorId': 1}, 'title description', function(err, track){
		if (err) return handleError(err);
		console.log(track);
	});
	//console.log("Title: %s \nDescription: %s", track.title, track.description);
	return returnObject;
}

function getSchema(collection){
	if (collection == "track"){
		var trackSchema = new mongoose.Schema({
			title:  String,
			creatorId: Number,
			description:   String,
			type: String,
			date: { type: Date, default: Date.now },
		});
		trackSchema.methods.getTitle = function(){
			console.log("Track #" + this.creatorId + " has the Title " + this.title);
		}
		return trackSchema;
	}
}

initDatabase();


