/**
 * Created by winter on 6/29/2017.
 */

const express = require("express"),
    router = express.Router(),
    passport = require('passport'),
    Customer = require('../models/customer'),
    Contract = require('../models/contract'),
    Service = require('../models/service'),
    House = require('../models/house'),
    {formHelper} = require('../utils/forms'),
    middleware = require('../middleware'),
    stripe = require("stripe")("sk_test_ayHoWT14idAVgdpSdaA4c9YA");

let currCust, currHouse, currCont, currServ, token;

router.post("/personal", function (req, res) {
    // console.log('REQUEST BODY ', req.body);
    const regCustomer = () => {
        return new Promise((resolve, reject) => {
            const newCustomer = {
                name: `${req.body.form_first_name} ${req.body.form_last_name}`,
                email: req.body.username,
                phone: req.body.form_phone_h
            };
            Customer.register(newCustomer, req.body.password, function (err, newDbCustomer) {
                if (err) {
                    reject('FAILED TO CREATE CUSTOMER', err);
                } else {
                    passport.authenticate("local")(req, res, function() {
                        req.session.save(function (err) {
                            if (err) {
                                console.log('ERROR INSIDE SESSION');
                            }
                            console.log('SESSION SAVED');
                        });
                        if(req.isAuthenticated()) {
                            console.log('SESSION  ', req.session)
                        }
                    });
                    currCust = newDbCustomer;
                    console.log('CURRCUST 1 ' , currCust)
                    resolve(newDbCustomer);
                }
            })
        });
    };

    const regHouse = async () => {
        const newHouse = {
            state: req.body.form_input_state_h,
            city: req.body.form_city,
            zipcode: req.body.form_zipcode,
            street_address: req.body.form_address,
            apt: req.body.form_apt || '0',
            bedrooms: /[0-9]{1}/.exec(req.body.form_input_bedroom_h),
            bathrooms: /[0-9]{1}/.exec(req.body.form_input_bathroom_h),
            full_address: req.body.form_full_address
        };
        return House.create(newHouse)
            .then((newDbHouse) => {
                currHouse = newDbHouse;
                return newDbHouse;
            }).catch((err) => {
                throw new Error('FAILED TO CREATE HOUSE', err);
            });
    };

    const callDB = async () => {
        const customerReg = await regCustomer(),
            houseReg = await regHouse();
        customerReg.address = houseReg._id;
        customerReg.save();
        return 'OK';
    };

    callDB().then((status) => {
        console.log(status);
    }).catch((e) => {
        console.log(e.message);
    });

});

router.post("/service", function (req, res) {
    // console.log('REQUEST: ', req.body);
    const regContract = async () => {
        return Contract.create({frequency: req.body.form_frequency})
            .then((newDbContract) => {
                // console.log('CONTRACT CREATED: ', newDbContract);
                return newDbContract;
            })
            .catch((err) => {
                throw new Error('FAILED TO CREATE CONTRACT', err);
            });
    };

    const regService = async () => {
        arrAddons = [];
        if (req.body.form_input_addons.length > 0) {
            objAddons = JSON.parse(req.body.form_input_addons);
            for (add in objAddons) {
                arrAddons.push(add);
            }
        }
        const newService = {
            date: req.body.form_date,
            hour: /[0-9]{2}\:[0-9]{2}/.exec(req.body.form_input_hour_h),
            addons: arrAddons,
            keyPlace: req.body.form_place_keys || '',
            instructions: req.body.form_instructions || ''
        };
        return Service.create(newService)
            .then((newDbService) => {
                // console.log('SERVICE CREATED: ', newDbService)
                return newDbService;
            })
            .catch((err) => {
                throw new Error('FAILED TO CREATE SERVICE', err);
            });
    };

    const callDB = async () => {
        const contractReg = await regContract(),
            serviceReg = await regService(),
            servFinish = await formHelper.calcPrice(
                serviceReg, contractReg.frequency, currHouse.city, currHouse.bathrooms, currHouse.bedrooms);
        contractReg.services.push(servFinish);
        contractReg.save();
        currCont = contractReg;
        currServ = servFinish;
        currCust = await formHelper.updateCustomer(currCust._id, {contract: contractReg._id});
        return currCust;
    };

    callDB().then((status) => {
        console.log('CALLDB STATUS CURRCUST  ', status);
        // console.log('CURRCUST 2',  currCust)
        // console.log('CONTRACT:  ', currCont);
        // console.log('SERVICE:  ', currServ);
    }).catch((e) => {
        console.log(e.message);
    });
});

router.post("/token", function (req, res) {
    token = req.body.token;
});

router.post("/pay", function (req, res) {
    stripe.customers.create({
        email: currCust.email,
        source: token,
    }).then(function (customer) {
        const price = parseInt(currServ.price);
        return stripe.charges.create({
            amount: price*100,
            currency: "usd",
            customer: customer.id,
        });
    }).then(async function (charge) {
        console.log('STRIPE CHARGE: ');
        console.log(charge);
        //todo log the charge
        currCust = await formHelper.updateCustomer(currCust._id, {stripeID: charge.source.customer}, {card: charge.source.id});
        console.log('CURRCUST 3',  currCust)
        res.redirect('/book');
    }).catch(function (err) {
        console.log('STRIPE CHARGE ERROR: ');
        console.log(err.message);
        //todo log the error
        res.send({response: err.message});
    });
});

router.get('/book', middleware.isLoggedIn, function (req, res) {
    console.log('BEFORE DASHBOARD ')
    console.log('CUSTOMER ',currCust)
    console.log('HOUSE ',currHouse)
    console.log('CONTRACT ',currCont)
    console.log('SERVICE ',currServ)
    res.render("index", {cust: currCust, house: currHouse, contract: currCont, service: currServ});
});

// YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
// stripe.charges.create({
//     amount: 1500, // $15.00 this time
//     currency: "usd",
//     customer: customerId,
// });


router.get("/chat", function (req, res) {
    res.render('chat_page');
});

router.get("/chat_admin", function (req, res) {
    res.render('chat_admin');
});

router.get("/email", function (req, res) {
    res.render('email_page');
});

module.exports = router;



