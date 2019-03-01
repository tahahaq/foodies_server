var exports = module.exports = {},
    utilFunctions = require('../utilFunctions'),
    constants = require('../constants'),
    placeModel = require('../../models/place');

exports.deletePlaceRequest = async (placeId) => {
    try {
        let place = await  placeModel.findByIdAndRemove(placeId);
        if(!place){
            throw new Error(constants.responseMessages.placeDoesntExist)
        }
        await utilFunctions.sendPlaceRejectionEmail(place.email , place.name);

        return {name : place.name , success : true}

    }  catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.deletePlace = async (placeId) => {
    try {
        let place = await  placeModel.findByIdAndRemove(placeId);
        if(!place){
            throw new Error(constants.responseMessages.placeDoesntExist);
        }
        await utilFunctions.sendPlaceRejectionEmail(place.email , place.name);

        return {name : place.name , success : true}

    }  catch (e) {
        console.log(e);
        throw new Error(e)
    }
};
