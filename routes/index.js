var express = require("express");
var router = express.Router({mergeParams: true});
var flash = require("connect-flash");
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("landing", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/");
        })
    });
});

//LOGIN ROUTES
//render login form
router.get("/login", function(req, res) {
    res.render("login");
});

//login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/",
    failureRedirect: "/loginerror"
}), function (req, res) {
});

router.get("/loginerror", function(req, res){
    res.render("loginerror");
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

//User Route
router.get("/userprofile/:user_id", function(req,res){
    User.findById(req.params.user_id, function (err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.render("users/userprofile", {user: foundUser});
            // res.send(foundUser);
        }
    });   
});

router.get("/userprofile/:user_id/edit", function(req, res) {
     User.findById(req.params.user_id, function (err, foundUser){
        if(err){
            console.log(err);
        }else{
            // console.log(foundUser);
            res.render("users/edit", {user: foundUser});
        }
    });
})

router.put("/userprofile/:user_id", function (req, res) {
    User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updatedUser) {
        // console.log(req.params.user_id);
        // console.log(req.body.user);
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Username updated! Please re-login!" );
            res.redirect("/login");
        }
    })
})


module.exports = router;