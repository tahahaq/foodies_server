var exports = module.exports = {},
    utilFunctions = require('../utilFunctions'),
    constants = require('../constants'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    adminModel = require('../../models/admin'),
    placeModel = require('../../models/place');



exports.insertAdmin = async (admin) => {
    try {
            let hashOfPassword = await bcrypt.hash(admin.password, constants.SALT);

            await adminModel.create({
                username : admin.username,
                password : hashOfPassword,
                email : admin.email,
            });

            return {auth : true  };
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }

};

exports.insertPlace = async (place) => {
    try {
        if (await utilFunctions.isDuplicateUser(place)) {
            let hashOfPassword = await bcrypt.hash(place.password, constants.SALT);

            let insertedPlace = await placeModel.create({
                username : place.username,
                password : hashOfPassword,
                email : place.email,
                name: place.name,
                formatted_address: place.formatted_address,
                website: place.website,
                opening_hours : place.opening_hours,
                menu : place.menu,
                is_listed :false,
                formatted_phone_number: place.formatted_phone_number,
                description: place.description,
                banner_image: place.banner_image,
                google_place_link:place.google_place_link,
                food_type: place.food_type,
                facebook_url: place.facebook_url,
                place_images: place.place_images,
                cost: place.cost,
                short_description: place.short_description,
                facilities: place.facilities
            });

            let token = jwt.sign({id : insertedPlace._id } , constants.secret , {
                expiresIn: 84600
            });

            let returningPlace = insertedPlace.toObject();
            delete returningPlace.password;
            delete returningPlace.is_listed;

            return {auth : true  , token : token , place : returningPlace};
        }
        throw new Error(constants.responseMessages.emailAlreadyExists)

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }

};

