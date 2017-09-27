var mongoose = require("mongoose");
var hometown = require("./models/hometowns");
var Comment = require("./models/comments");
var data = [
        {name: "Gerogia Tech", 
        image: "https://farm3.staticflickr.com/2140/2387387745_78ddf6ac1e.jpg",
        description: "jqiowjgoijfqofjwfj qoqj eoiqjfoqowigqjoirgj oqgj qoijrg oiqqogj qoig qg "},
        {name: "GT Graduation", 
        image: "https://farm5.staticflickr.com/4154/4990627077_f84c90ce11.jpg",
        description: "jqiowjgoijfqofjwfj qoqj eoiqjfoqowigqjoirgj oqgj qoijrg oiqqogj qoig qgThis is the graduation day!"},
        {name: "GT Buzz", 
        image: "https://farm5.staticflickr.com/4105/4991085936_ccc02a0860.jpg",
        description: "jqiowjgoijfqofjwfj qoqj eoiqjfoqowigqjoirgj oqgj qoijrg oiqqogj qoig qg This is the GT Buzz!"},
    ]
function seedDB() {
    // remove all hometowns
    hometown.remove({}, function(err){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //     console.log("Deleted!");
    //     }
    //     // add a few hometowns
    //     data.forEach(function(seed){
    //         hometown.create(seed, function(err, hometown){
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("Add a new hometown!");
    //                 // create a comment
    //                 Comment.create(
    //                     {
    //                         text: "This place is great!",
    //                         author: "hansen"
    //                     }, function(err, comment) {
    //                         if (err) {
    //                             console.log(err);
    //                         } else {
    //                             hometown.comments.push(comment);
    //                             hometown.save();
    //                             console.log("Created a new comment!");
    //                         }
    //                     }
    //                 );
    //             }
    //         });
    //     });
    });
}

module.exports = seedDB;
