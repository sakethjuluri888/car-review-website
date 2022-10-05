var express         = require("express") // allows us to communicaye with the server
var app             = express(); // using app only we comunicate with server

var bodyparser      = require("body-parser");
const mongoose      = require("mongoose");
var Car             = require("./models/car.js");
var Comment         = require("./models/comment.js");
const passport      = require('passport');
var methodOverride  = require('method-override');
const LocalStrategy = require('passport-local');
var User            = require("./models/user.js");
// var seedDB          = require("./seeds.js");  
var flash           = require('connect-flash');

//Requiring Routes
var commentsRoutes      = require('./routes/comments.js'),
    carsRoutes          = require('./routes/cars.js'),
    authRoutes          = require('./routes/auth.js')




mongoose.connect("mongodb://localhost/torquedbfinal",{useNewUrlParser:true ,useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public")); // all of the css thing stays
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret:"CSE3002-RNJ!",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//To add Current User in all the ROutes
//To send Message to all templates
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});



app.use(commentsRoutes);
app.use(carsRoutes);
app.use(authRoutes);

app.listen(3001,function(){
  console.log("Torque Server Has Started!");
});
