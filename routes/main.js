const express = require("express"),
    router = express.Router(),
    Customer = require('../models/customer'),
    passport = require('passport'),
    House = require('../models/house');

//todo delete this
router.get("/pay", function (req, res) {
    res.render('payment');
});

router.get("/", function (req, res) {
    res.render('landing');
});

router.get("/app", function (req, res) {
    res.render('index');
});

router.get("/service", function (req, res) {
    res.render('form-index');
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {return next(err)}
        if (!user) {return res.send('wrong')}
        req.logIn(user, function(err) {
            if (err) { return next(err)}
            return res.render('index', { username: req.session.passport.user});
        });
    })(req, res, next);
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post("/chatlogin", function (req, res) {
    res.render('chat_admin', {email: req.body.email, name: req.body.password});
});

module.exports = router;