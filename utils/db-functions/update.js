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
        return {name : place.name , success : true}
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.updatePlacePortalPassword = async (placeId , place) => {
     try {
         let hashOfPassword = await bcrypt.hash(place.password, constants.SALT);
         return await placesPortal.findByIdAndUpdate(placeId, {password: hashOfPassword});
     } catch (e) {

     }
};


exports.updateFeaturedPlaceReview = async (placeId, reviewData) => {
    try {
         await userReviewModel.findByIdAndUpdate(placeId,reviewData);
        return constants.responseMessages.Success
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.updateHangoutPlaceEvent = async (placeId, reviewData) => {
    try {
        let event = await eventModel.findByIdAndUpdate(placeId,reviewData);
        if(!event){
            throw new Error("Invalid event Id")
        }
        return constants.responseMessages.Success
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.updateFeaturedPlace = async (placeId, placeData) => {
    try {
        let featuredShortData = await foodFeaturedModel.findByIdAndUpdate(placeId, placeData);
        await foodFeaturedDetailModel.findByIdAndUpdate(featuredShortData.featured_detail_id, placeData);
        return featuredShortData.name
    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


