var exports = module.exports = {},
    nodeMailer = require('nodemailer'),
    axios = require('axios'),
    constants = require('./constants'),
    placeModel = require('../models/place');


// giving access to nodeMailer for logging into mail account
var mailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: "haqtaha@gmail.com",
        pass: 'mvibckbmjwpddzsj'
    }
});

exports.sendPlaceApprovedEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: 'haqtaha@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Contact Info', // Subject line
            html: `Your listing ${name} was approved.`
        };
        await mailTransporter.sendMail(mailOptions);
        return constants.responseMessages.Success

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.sendSMS = async (name , placeId , phoneNumber , isApproved) => {
    try {
        let approved = '';
        if(isApproved){
            approved = `Your place ${name} is approved on foodies.pk. Visit http:localhost:3000/places/${placeId} `
        } else {
            approved = `Your place ${name} is rejected on foodies.pk`
        }
        const a =await  axios.get(`https://sendpk.com/api/sms.php?username=923472360717&password=9347&sender=Foodies&mobile=${phoneNumber}&message=${approved}`);
        console.log(a)

        return constants.responseMessages.Success;
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.sendPlaceRejectionEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: 'haqtaha@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Contact Info', // Subject line
            html: `Your listing ${name} was rejected.`
        };
        await mailTransporter.sendMail(mailOptions);
        return constants.responseMessages.Success

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

exports.isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

exports.isDuplicateUser = async (place) => {
    let duplicateUser = await placeModel.find({email: place.email});
    return !Array.isArray(duplicateUser) || !duplicateUser.length;
};
