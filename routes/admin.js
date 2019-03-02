let express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    constants = require('../utils/constants'),
    db_insert = require('../utils/db-functions/insert'),
    db_delete = require('../utils/db-functions/delete'),
    db_read = require('../utils/db-functions/read'),
    db_update = require('../utils/db-functions/update');

// LOGGING IN

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
////////////////////////--------------------------------------------- ADMIN ROUTES -----------------------------------------------/////////////////////////


// GET PLACE REQUESTS

router.get("/place-request",function (req, res) {
    db_read.getPlaceRequests().then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 200,
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

// APPROVE PLACE REQUEST

router.put("/place-request/:place_id",function (req, res) {
    db_update.approvePlaceRequest(req.params.place_id).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 200,
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


// DELETE PLACE REQUEST
router.delete("/place-request/:place_id", function (req, res) {
    db_delete.deletePlaceRequest(req.params.place_id).then((response) => {
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



// DELETE PLACE
router.delete("/place/:place_id",  function (req, res) {
    db_delete.deletePlace(req.params.place_id).then((response) => {
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

router.post('/login', function (req, res) {
    db_read.authenticateAdmin(req.body).then((response) => {
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


module.exports = router;