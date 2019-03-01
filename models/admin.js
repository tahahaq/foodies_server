var mongoose = require("mongoose");

userSchema  = new mongoose.Schema({
    password : String,
    name : String,
    email : String,

});


module.exports = mongoose.model("User", userSchema);