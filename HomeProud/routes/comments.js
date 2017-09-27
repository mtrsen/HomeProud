// comments routes
var express = require("express");
var router = express.Router();
var Hometown = require("../models/hometowns");
var Comment = require("../models/comments");
var middleware = require("../middleware");
// NEW comments routes
router.get("/hometowns/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    // find hometown by id
    Hometown.findById(req.params.id, function(err, hometown){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {hometown: hometown});
        }
    });
});

// POST comments routes
router.post("/hometowns/:id/comments", middleware.isLoggedIn, function(req, res){
    // look up Hometowns using id
    Hometown.findById(req.params.id, function(err, hometown) {
        if (err) {
            console.log(err);
            res.redirect("/hometowns");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    req.flash("success","Successfully Created!");
                    // add username and id to comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    // save the comment
                    comment.save();
                    // connect new comment to hometown
                    hometown.comments.push(comment);
                    hometown.save();
                    // redirect hometown new page
                    res.redirect("/hometowns/" + hometown.id);
                }
            });
        }
    });
});

// comments DESTROY routes
router.delete("/hometowns/:id/comments/:comment_id", middleware.checkCommentAuthor, function(req, res) {
    // find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success","Successfully Deleted!");
            res.redirect("/hometowns/" + req.params.id);
        }
    })
})


module.exports = router;