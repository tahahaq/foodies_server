var exports = module.exports = {},
    utilFunctions = require('../utilFunctions'),
    constants = require('../constants'),
    placeModel = require("../../models/place"),
    bcrypt = require('bcrypt');

exports.updatePlaceDetails = async (placeId, placeData) => {
    try {
        let place = await placeModel.findByIdAndUpdate(placeId, placeData);
        return {name : place.name , success : true}

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.approvePlaceRequest = async (placeId) => {
    try {
        let place = await placeModel.findByIdAndUpdate(placeId, {is_listed : true});
        await utilFunctions.sendPlaceApprovedEmail(place.email , place.name);
        // await utilFunctions.sendSMS(place.name ,place._id,place.formatted_phone_number, true);
        return {name : place.name , success : true}
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};
