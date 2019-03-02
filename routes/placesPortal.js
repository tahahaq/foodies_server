let  express = require('express'),
    router  = express.Router(),
    jwt = require('jsonwebtoken'),
    db_read = require('../utils/db-functions/read'),
    db_insert = require('../utils/db-functions/insert'),
    db_update = require('../utils/db-functions/update'),
    db_delete = require('../utils/db-functions/delete'),
    constants = require("../utils/constants");


function verifyToken(req, res, next) {

    let token = req.body['x-access-token'];
    if (!token)
        return res.status(403).send({
            auth: false, message: 'No token provided.'});
    jwt.verify(token, constants.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

router.put('/:place_id', verifyToken,function (req, res) {
    db_update.updatePlaceDetails(req.params.place_id, req.body).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


router.post('/place-login', function (req, res) {

    db_read.authenticatePlace(req.body).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


router.post('/place-register', function (req, res) {
    db_insert.insertPlace(req.body).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result:  response

                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


module.exports = router;