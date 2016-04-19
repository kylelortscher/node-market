//Setting Up NPM Packages
var express = require('express');
var expressSession = require('express-session');
var session = require('client-sessions');
var flash = require('connect-flash');
//To Use Express
var app = express();
//Setting Up More NPM Packages
var bodyParser = require('body-parser');
//Used for MONGO DB
var mongoose = require("mongoose");
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

//Route For Homepage
var landingRoutes  = require("./routes/landing");
var messageRoutes  = require("./routes/message");
var purchaseRoutes = require("./routes/purchase");
var serviceRoutes  = require("./routes/service");
var settingRoutes  = require("./routes/setting");
var userRoutes     = require("./routes/user");


//Models
var User = require("./models/user");

//Used For Flash Messages
app.use(cookieParser('secret'));
app.use(expressSession({cookie: { maxAge: 60000 }}));
app.use(flash());

//Client-Sessions For Auth
app.use(session({
	cookieName: 'auth', // cookie name dictates the key name added to the request object
	secret: 'first secret', // should be a large unguessable string
	duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
	activeDuration: 1000 * 60 * 60 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

//Mongoose Connected To Mongolab
mongoose.connect("mongodb://localhost/market");

//Boilerplate code needed for setup of npm package
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//Allows us to not use .ejs when using render on a file
app.set("view engine", "ejs");


//SETTING UP CLIENT-SESSIONS TO WORK WITH AUTHENTICATION
app.use(function(req, res, next){
	if (req.auth && req.auth.user) {
		User.findOne({ email: req.auth.user }, function(err, user) {
			//If A User Was Found, Make The User Available
			if (user) {
				currentUser = user;
				req.user = user;
				req.auth.user = user.email; //Update The Session Info
				res.locals.user = user; //
			}
			next();
		});
	} else {
		next(); //If No Session Is Available
	}
});


//FUNCTION TO CHECK EVERY SINGLE PAGE TO GET THE CURRENT USERS INFO
//WE ARE ALSO PASSING THE ERROR MESSAGES TO EVERY SINGLE PAGE
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.info = req.flash("info");
	res.locals.warning = req.flash("warning");
	next();
});

//Getting Public Stylesheets And Javascript
app.use(express.static(__dirname + "/public"));

//Setup For MethodOverride NPM
app.use(methodOverride('_method'));

//SETTING UP ROUTES IN OTHER FILES
app.use(landingRoutes);
app.use(messageRoutes);
app.use(purchaseRoutes);
app.use(serviceRoutes);
app.use(settingRoutes);
app.use(userRoutes);


//Start Server Needed For Deployment
if (module === require.main) {
	// [START server]
	// Start the server
	var server = app.listen(process.env.PORT || 8080, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('App listening at http://%s:%s', host, port);
	});
	// [END server]
}