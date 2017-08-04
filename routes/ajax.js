/**
 * Created by winter on 7/22/2017.
 */

const express = require("express"),
    router = express.Router(),
    Customer = require('../models/customer'),
    House = require('../models/house');

router.post("/check_email", function (req, res) {
    Customer.findOne({email: req.body.email}).exec()
        .then((foundEmail) => {
            if (foundEmail) {
                console.log('EMAIL FOUND', foundEmail);
                res.send({response: 'found'});
            } else {
                console.log('EMAIL NOT FOUND');
                res.send({response: 'not_found'});
            }
        })
        .catch((err) => {
            res.send({response: 'unable'});
        })
});

router.post("/check_phone", (req, res) => {
    Customer.findOne({phone: req.body.phone}).exec()
        .then((foundPhone) => {
            if (foundPhone) {
                res.send({response: 'found'});
            } else {
                res.send({response: 'not_found'});
            }
        })
        .catch((err) => {
            res.send({response: 'unable'});
        });
});

router.get("/check_address/:address", (req, res) => {
    House.findOne({full_address: req.params.address}).exec()
        .then((foundAddress) => {
            if (foundAddress) {
                res.send({response: 'found'});
            } else {
                res.send({response: 'not_found'});
            }
        })
        .catch((err) => {
            res.send({response: 'unable'});
        });
});

router.post("/check_card", (req, res) => {
    Customer.findOne({payment:{credit_card: req.body.card}}).exec()
        .then((foundCard) => {
            if (foundCard) {
                res.send({response: 'found'});
            } else {
                res.send({response: 'not_found'});
            }
        })
        .catch((err) => {
            res.send({response: 'unable'});
        });
});


module.exports = router;