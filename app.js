var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Properties  = require("./models/properties"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	User         = require("./models/user"),
	seedDB 		= require("./seeds")

var propertyRoutes = require("./routes/properties"),
	indexRoutes    = require("./routes/index")

//seedDB();
mongoose.connect("mongodb://localhost:27017/RoseHouses", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static( "public"));

//Passport Configuration
app.use(require("express-session")({
	secret: "Once again Rosemary",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use(indexRoutes);
app.use("/properties",propertyRoutes);




app.get("/", function(req, res){
	res.render("landing");
});


app.listen(3000, function(){
	console.log("Rosemary's server has started");
});

