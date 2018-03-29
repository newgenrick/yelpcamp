var express    = require("express");
var app        = express();
var parser     = require("body-parser");
var mongoose   = require("mongoose");
var override   = require("method-override");
var passport   = require("passport");
var strategy   = require("passport-local");
var localmong  = require("passport-local-mongoose");
var expsession = require("express-session");
var flash      = require("express-flash");
var campground = require("./models/campgrounds");
var comment    = require("./models/comments");
var user       = require("./models/user");
var seeddb     = require("./seeds");



app.use(override("_method"));
app.use(flash());
var indexroute      = require("./routes/index");
var commentroute    = require("./routes/comment");
var campgroundroute = require("./routes/campground");

//seeddb();

app.use(expsession({
	secret            : "yelpcamp",
	resave            : false,
	saveUninitialized : false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new strategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(parser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname+"/public"));
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});


app.use(campgroundroute);
app.use(commentroute);
app.use(indexroute);



app.listen(process.env.PORT,process.env.IP);





// campground.create({name:"cornwall",image:"https://coolcamping.com/system/boxes/699/Devon-Cornwall-South-West-campsites-small.jpg",desc:"great place amust visit"},
// 	function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log(campground);
// 		}
// 	}
// );
// campground.create({name:"scotland",image:"https://coolcamping.com/system/boxes/923/Scotland-campsites-small.jpg",desc:"this is an adventurous location for barve hearted people only"},
// 	function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log(campground);
// 		}
// 	}
// );

// var campgrounds = [
// 	{name:"scotland",image:"https://coolcamping.com/system/boxes/923/Scotland-campsites-small.jpg"},
// 	{name:"cornwall",image:"https://coolcamping.com/system/boxes/699/Devon-Cornwall-South-West-campsites-small.jpg"}
// ];


// //handling login logic
// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/campgrounds';
//       delete req.session.redirectTo;
//       res.redirect(redirectTo);
//     });
//   })(req, res, next);
// });

// middlewareObj.isLoggedIn = function(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.session.redirectTo = req.originalUrl;
//     req.flash("error", "You need to be logged in to do that");
//     res.redirect("/login");
// }