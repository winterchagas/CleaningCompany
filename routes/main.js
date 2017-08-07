const express = require("express"),
    router = express.Router(),
    Customer = require('../models/customer'),
    passport = require('passport'),
    House = require('../models/house');

router.get("/", function (req, res) {
    res.render('landing');
});

router.get("/app", function (req, res) {
    res.render('index');
});

router.get("/login", function (req, res) {
    res.render('login');
});

router.get("/service/new", function (req, res) {
    res.render('form-index');
});

router.post("/login", passport.authenticate('local',
    {
        successRedirect: '/app',
        failureRedirect: '/app'
    }), function (req, res) {
});

router.post("/chatlogin", function (req, res) {
    res.render('chat_admin', {email: req.body.email, name: req.body.password});
});

module.exports = router;