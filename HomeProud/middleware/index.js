// all the middlewares go here
var middlewareObj = {};
var Hometown = require("../models/hometowns");
var Comment = require("../models/comments");

middlewareObj.checkPhotoAuthor = function(req, res, next) {
    // check hometowns author
    // check if user logged in
    if (req.isAuthenticated()) {
        Hometown.findById(req.params.id, function(err, hometown){
            if (err || !hometown) {
                req.flash("error","Home Not Found!");
                res.redirect("back");
            }
            else {
                // does user own the photos
                if (hometown.author.id.equals(req.user.id)) {    
                    next();
                } else {
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentAuthor = function(req, res, next) {
    // check comments author
    // check if user logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment){
            if (err || !comment) {
                req.flash("error", "Comments Not Found!")
                res.redirect("back");
            }
            else {
                // does user own the comment
                if (comment.author.id.equals(req.user.id)) {    
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    // check the state of user
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}
module.exports = middlewareObj;