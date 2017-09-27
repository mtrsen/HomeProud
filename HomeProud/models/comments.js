var mongoose = require("mongoose");


// set up comment schema
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        // to show the username automatically
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);