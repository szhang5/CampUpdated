const express             = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    processImage          = require("express-processimage"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),   
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user"),
    seedDB                = require("./seeds");

const env= process.env.NODE_ENV || "development";
if(env == 'development'){
  mongoose.connect("mongodb://localhost/yelp_camp");
} else {
  mongoose.connect(process.env.DATABASEURL);
  console.log(process.env.DATABASEURL);
}
console.log(env);


mongoose.connect("mongodb://shiyun:ZSYqq490562824@ds239940.mlab.com:39940/yelpcamp");
    
//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(processImage(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); 

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Pika is the cutest cat in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//currentUser setup, message set up
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
});

// app.listen("8080", function(){
//     console.log("The YelpCamp Server has started!");
// });