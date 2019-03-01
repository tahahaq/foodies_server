let  express = require('express'),
    router  = express.Router(),
    db_read = require('../utils/db-functions/read'),
    db_insert = require('../utils/db-functions/insert'),
    db_update = require('../utils/db-functions/update'),
    db_delete = require('../utils/db-functions/delete'),
    constants = require("../utils/constants");


router.get("/all", function (req, res) {
    db_read.getAllPlaces().then((response) => {
        // SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: "Successful",
                data: {
                    results: response
                }
            }
        )
        // ERROR
    }).catch((error) => {
        res.status(503).send(
            {
                responseCode: 503,
                responseMessage: error.message
            }
        )
    })
});


router.get("/:place_id", function (req, res) {
    db_read.getAllPlaces(req.params.place_id).then((response) => {
        // SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: "Successful",
                data: {
                    results: response
                }
            }
        )
        // ERROR
    }).catch((error) => {
        res.status(503).send(
            {
                responseCode: 503,
                responseMessage: error.message
            }
        )
    })
});


module.exports = router;