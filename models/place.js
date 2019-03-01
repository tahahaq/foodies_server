let mongoose = require("mongoose");

placeSchema = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
    name: String,
    formatted_address: String,
    formatted_address_short: String,
    website: String,
    opening_hours: [],
    menu : [],
    is_listed : Boolean,
    formatted_phone_number: String,
    description: String,
    banner_image: String,
    google_place_link: String,
    food_type: String,
    facebook_url: String,
    place_images: [],
    cost: Number,
    short_description: String,
    facilities: []
});

//MODEL
module.exports = mongoose.model("place", placeSchema);