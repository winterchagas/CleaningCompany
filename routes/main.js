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

router.get("/service", function (req, res) {
    res.render('form-index');
});

router.get("/login", function (req, res) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send('wrong'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/app' + user.username);
        });
    })(req, res, next);
});

router.post("/chatlogin", function (req, res) {
    res.render('chat_admin', {email: req.body.email, name: req.body.password});
});

module.exports = router;