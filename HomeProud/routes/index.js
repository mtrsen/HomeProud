var express = require("express");
var router = express.Router();
var User = require("../models/users");
var passport = require("passport");
// set the homepage
router.get("/", function(req, res){
    res.render("landing");
});

//--------
// authentication routes
//--------
// register route
router.get("/register", function(req, res) {
    res.render("register");
});
// register post route with sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,  function(err, user){
        if (err) {
            return res.render("register", {"error": err.message});
        }
        req.flash("success", "Welcome to HomeProud!")
        passport.authenticate("local")(req, res, function(){
            res.redirect("/hometowns");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});
// login post route with log in logic
router.post("/login", passport.authenticate("local",{
    successRedirect: "/hometowns",
    failureRedirect: "/login"
    }), function(req, res) {
});
// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You Have Logged Out");
    res.redirect("/hometowns");
});

module.exports = router;