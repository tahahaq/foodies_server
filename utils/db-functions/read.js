var exports = module.exports = {},
    utilFunctions = require('../utilFunctions'),
    constants = require('../constants'),
    placeModel = require('../../models/place'),
    adminModel = require('../../models/admin'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');


exports.getAllPlaces = async () => {
    try {
        return await placeModel.find({is_listed : true});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.getPlaceById = async (placeId) => {
    try {
        return await placeModel.findById(placeId);
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};




exports.authenticateAdmin = async (user) => {
    try {
        let admin = await adminModel.find({email: user.email});
        if (utilFunctions.isEmpty(admin)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, admin[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: admin[0]._id}, constants.secret, {
            expiresIn: 84600
        });

        let returningUser = admin[0].toObject();
        delete returningUser.password;
        delete returningUser.is_listed;


        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.authenticatePlace = async (user) => {
    try {
        let placeUser = await placeModel.find({email: user.email});
        if (utilFunctions.isEmpty(placeUser)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, placeUser[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: placeUser[0]._id}, constants.secret, {
            expiresIn: 84600
        });

        let returningUser = placeUser[0].toObject();
        delete returningUser.password;

        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


// USER-LOGIN FUNCTIONS

exports.authenticateUser = async (user) => {
    try {
        let dbUser = await userModel.find({email: user.email});
        if (constants.isEmpty(dbUser)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, dbUser[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: dbUser[0]._id}, constants.secret.secret, {
            expiresIn: 84600
        });

        let returningUser = dbUser[0].toObject();
        delete returningUser.password;


        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};



exports.getPlaceRequests = async () => {
    try {
        return await placeModel.find({is_listed: false});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};