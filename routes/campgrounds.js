var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX -show all campgrounds show all campground
router.get("/", function(req, res){
    // console.log(req.user);
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price:price, image:image, description:desc, author: author }
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
});

router.get("/mycampgrounds", middleware.isLoggedIn, function(req, res) {
     Campground.find({ "author.id": req.user._id }, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/mycampgrounds", {campgrounds: allCampgrounds, currentUser: req.user});
            // res.send(allCampgrounds);
        }
    });
    
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW- shows more info about one campground
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            req.flash("error", "Oop! Something went wrong!");
        } else if (!foundCampground){
            res.status(404).send("not found");
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
            // res.send(foundCampground);
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Oop! Something went wrong!");
        }else{
           res.render("campgrounds/edit", {campground: foundCampground}); 
           // res.send(foundCampground);
        }
        
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Oop! Something went wrong!");
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
     Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Oop! Something went wrong!");
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground deleted");
            res.redirect("/campgrounds/");
        }
    });
});



module.exports = router;
