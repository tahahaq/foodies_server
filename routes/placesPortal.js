let  express = require('express'),
    router  = express.Router(),
    db_read = require('../utils/db-functions/read'),
    db_insert = require('../utils/db-functions/insert'),
    db_update = require('../utils/db-functions/update'),
    db_delete = require('../utils/db-functions/delete'),
    constants = require("../utils/constants");

router.put('/:place_id', function (req, res) {
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