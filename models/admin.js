var mongoose = require("mongoose");

userSchema  = new mongoose.Schema({
    uuid : String,
    password : String,
    name : String,
    email : String,
    gender : String,
    profile_photo_url : String,
    dateOfBirth : String,
    time : String,
    reset_password_token: String,
    reset_password_expires: Date

});


module.exports = mongoose.model("User", userSchema);