// Hometowns routes
var express = require("express");
var router = express.Router();
var Hometown = require("../models/hometowns");
var middleware = require("../middleware");
// INDEX route
router.get("/hometowns", function(req, res){
    // get all hometowns from DB
    Hometown.find({}, function(err, hometowns){
        if (err) {
            console.log(err);
        }
        else {
            res.render("hometowns/index", {hometowns:hometowns, user: req.user});
        }
    });
});

// same url for post request
// CREATE route
router.post("/hometowns", function(req, res){
    // get data from form and add to hometowns array
    var hometownsName = req.body.hometownsName;
    var image = req.body.url;
    var description = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newhometown = {name : hometownsName, image: image, description: description, author: author};
    // create a new Hometown and save it to DB
    Hometown.create(newhometown, function(err, hometown){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/hometowns");
        }
    });
});

//  the form to make post
// NEW route
router.get("/hometowns/new", middleware.isLoggedIn, function(req, res) {
   res.render("hometowns/new", {user: req.user}); 
});

// show more info about the hometown
// SHOW route
router.get("/hometowns/:id", function(req, res) {
    // find the hometown with provided ID
    Hometown.findById(req.params.id).populate("comments").exec(function(err, found){
       if (err || !found) {
           req.flash("error", "Home Not Found!");
           res.redirect("back");
       } else {
           // render show template with that hometown
           console.log(found);
           res.render("hometowns/show", {hometown: found, user: req.user});
       }
    });
});

// EDIT route
router.get("/hometowns/:id/edit", middleware.checkPhotoAuthor, function(req, res) {
    Hometown.findById(req.params.id, function(err, hometown){
        res.render("hometowns/edit", {hometown:hometown, user: req.user});
    });
});
// UPDATE route
router.put("/hometowns/:id", middleware.checkPhotoAuthor, function(req, res){
    // find and update the correct Hometown
    Hometown.findByIdAndUpdate(req.params.id, req.body.hometown, function(err, hometown){
        if (err) {
            res.redirect("/hometowns");
        } else {
            res.redirect("/hometowns/" + req.params.id);
        }
    });
});

// DESTROY route
router.delete("/hometowns/:id", middleware.checkPhotoAuthor, function(req, res){
   Hometown.findByIdAndRemove(req.params.id, function(){
       res.redirect("/hometowns");
   })
});



module.exports = router;