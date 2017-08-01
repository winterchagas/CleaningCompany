/**
 * Created by winter on 6/29/2017.
 */

const express = require("express"),
    router = express.Router(),
    passport = require('passport'),
    Customer = require('../models/customer'),
    Contract = require('../models/contract'),
    Service = require('../models/service'),
    Price = require('../models/price'),
    House = require('../models/house'),
    stripe = require("stripe")("sk_test_eQD9xzN3ZSpPLAJyOxc70kxn");

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
    res.render('form');
});

router.post("/service", function (req, res) {
    const regCustomer = () => {
        return new Promise((resolve, reject) => {
            const newCustomer = {
                name: `${req.body.form_first_name} ${req.body.form_last_name}`,
                email: req.body.username,
                phone: req.body.form_phone_h,
                credit_card: req.body.form_card_number.replace(/ /g, ""),
                expiration: `${/[0-9]{1,2}/.exec(req.body.form_card_month_h)}${/[0-9]{4}/.exec(req.body.form_card_year_h)}`,
                cvc: req.body.form_card_cvc,
            };
            Customer.register(newCustomer, req.body.password, function (err, newDbCustomer) {
                if (err) {
                    reject('FAILED TO CREATE CUSTOMER', err);
                } else {
                    passport.authenticate("local")(req, res, () => {
                        // req.flash('success', 'Welcome to YelpCamp'+ user.username +'.');
                        console.log('CUSTOMER LOGGED IN', newDbCustomer.name);
                    });
                    resolve (newDbCustomer);
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
            House.create(newHouse, (err, newDbHouse) => {
                if (err) {
                    throw new Error('FAILED TO CREATE HOUSE', err);
                } else {
                    return newDbHouse;
                    // console.log('HOUSE CREATED: ', newDbHouse)
                }
            })
    };

    const regContract = async () => {
            Contract.create({frequency: req.body.form_frequency}, (err, newDbContract) => {
                if (err) {
                    throw new Error('FAILED TO CREATE CONTRACT', err);
                } else {
                    return newDbContract;
                    // console.log('CONTRACT CREATED: ', newDbContract)
                }
            })
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
            Service.create(newService, (err, newDbService) => {
                if (err) {
                    throw new Error('FAILED TO CREATE SERVICE', err);
                } else {
                    return newDbService;
                    // console.log('SERVICE CREATED: ', newDbService)
                }
            })
    };

    const calcPrice = async (service, freq, city, bath, bed) => {
        let total, freqVal;
        if (freq === 'Weekly') {
            freqVal = 3
        }
        else if (freq === 'Biweekly') {
            freqVal = 2
        }
        else if (freq === 'Tri-Weekly' || freq === 'Montly') {
            freqVal = 1
        }
        else {
            freqVal = 0
        }
            Price.findOne({region: city}).exec()
                .then((foundPrice) => {
                    total = foundPrice.base_price + (bath * foundPrice.per_bathroom) +
                        (bed * foundPrice.per_bedroom);
                    total = total - (total * (freqVal * (foundPrice.per_frequency / 100)));
                    console.log(service.addons.length);
                    if (service.addons.length > 0) {
                        service.addons.forEach((addon) => {
                            total += foundPrice[addon];
                        });
                    }
                    service.price = total;
                    // console.log('TOTAL PRICE:  ', total);
                    return service;
                })
                .catch((err) => {
                    throw new Error('Unable to search for prices.');
                });
    };


    const callDB = async () => {
        const customerReg = await regCustomer(),
              houseReg = await regHouse(),
              contractReg = await regContract(),
              serviceReg = await regService(),
              servFinish = await calcPrice(
            serviceReg, contractReg.frequency, houseReg.city, houseReg.bathrooms, houseReg.bedrooms);
        customerReg.address = houseReg._id;
        customerReg.contract = contractReg._id;
        customerReg.save();
        contractReg.services.push(servFinish);
        contractReg.save();
        console.log('CUSTOMER:  ', customerReg);
        console.log('HOUSE:  ', houseReg);
        console.log('CONTRACT:  ', contractReg);
        console.log('SERVICE:  ', servFinish);
        res.render("index", {cust: customerReg, house: houseReg, cont: contractReg, serv: servFinish} );
        return 'OK';
    };

    callDB().then((status) => {
        console.log(status);
    }).catch((e) => {
        console.log(e.message);
    });
});

router.post("/login", passport.authenticate('local',
    {
        successRedirect: '/app',
        failureRedirect: '/app'
    }), function (req, res) {
});

router.get("/pay", function (req, res) {
    res.render('payment');
});

router.post("/pay", function (req, res) {
    const charge = stripe.charges.create({
        amount: 1000000,
        currency: "usd",
        description: "Example charge",
        source: req.body.stripeToken,
    }, function(err, charge) {
        if(err) {
            console.log('STRIPE CHARGE ERROR: ');
            console.log(err.message);
        } else {
            console.log('STRIPE CHARGE: ');
            console.log(charge);
        }
    });
    res.render('index');
});

module.exports = router;



