const mongoose = require('mongoose');
Customer = require('./models/customer'),
    House = require('./models/house'),
    Service = require('./models/service'),
    Employee = require('./models/employee'),
    Price = require('./models/price'),
    Contract = require('./models/contract');


const data_employee = [{
    name: 'Dolores Tenoria',
    email: 'dolo@gmail.com',
    phone: '8557892323',
    password: '123456',
    image: '',
    rating: '4',
}];

const data_house = [{
    state: 'CA',
    city: 'San Jose',
    zipcode: '95121',
    street_address: '1540 Fledermaus Ct',
    bedrooms: '4',
    bathrooms: '3',
    full_address: '1540 Fledermaus Ct, San Jose, CA 95121, USA'
}];

const data_service = [{
    date: '06052017',
    hour: '10:30',
    price: '85.00',
    completed: 'Yes',
    addons: ['windows'],
    keyPlace: 'Under the carpet.',
    instructions: 'No instructions',
    rating: '5',
}];

const data_contract = [{
    price: '85.00',
    frequency: 'Weekly',
    completed: 'Yes',
    addons: ['windows'],
    keyPlace: 'Under the carpet.',
    instructions: 'No instructions',
    rating: '5',
}];

const data_price = [{
    region: 'San Jose',
    base_price: 50,
    per_bedroom: 10,
    per_bathroom: 10,
    per_frequency: 5,
    discount: 0,
    windows: 10,
    fridge: 10,
    oven: 10,
    dishes: 10,
    eco: 5,
    carpet: 10,
    laundry: 10,
    deep: 30,
    move_out: 50
}];


const data_customer = [
    {
        email: "winterchagas@gmail.com",
        password: '123',
        name: 'Leonardo Winter',
        phone: '8582847103',
        credit_card: '44444444444444444',
        expiration: '062020',
        cvc: '650'
    },
    {
        email: "ma.puyol@hotmail.com",
        password: '123',
        name: 'Maria Puyol',
        phone: '619',
        credit_card: '4111111111111111',
        expiration: '122019',
        cvc: '941'
    }
];

function seedDB() {
    House.remove({}, function (err) {
        if (err) {
            console.log('HOUSES NOT REMOVED');
        } else {
            console.log('ALL HOUSES REMOVED');
            Service.remove({}, function (err) {
                if (err) {
                    console.log('SERVICES NOT REMOVED');
                } else {
                    console.log('ALL SERVICES REMOVED');
                    Employee.remove({}, function (err) {
                        if (err) {
                            console.log('EMPLOYEES NOT REMOVED');
                        } else {
                            console.log('ALL EMPLOYEES REMOVED');
                            Contract.remove({}, function (err) {
                                if (err) {
                                    console.log('CONTRACTS NOT REMOVED');
                                } else {
                                    console.log('ALL CONTRACTS REMOVED');
                                    Customer.remove({}, function (err) {
                                        if (err) {
                                            console.log('CUSTOMERS NOT REMOVED');
                                        } else {
                                            console.log('ALL CUSTOMERS REMOVED');
                                            House.create(data_house[0], (err, createdHouse) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log('HOUSE CREATED');
                                                    console.log(createdHouse);
                                                    Employee.create(data_employee[0], (err, createdEmp) => {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            console.log('EMPLOYEE CREATED');
                                                            console.log(createdEmp);
                                                            Service.create(data_service[0], (err, createdService) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                } else {
                                                                    console.log('SERFICE CREATED');
                                                                    console.log(createdService);
                                                                    Contract.create(data_contract[0], (err, createdContract) => {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else {
                                                                            console.log('CONTRACT CREATED');
                                                                            console.log(createdContract);
                                                                            Customer.create(data_customer[0], (err, createdCustomer) => {
                                                                                if (err) {
                                                                                    console.log(err);
                                                                                } else {
                                                                                    console.log('CUSTOMER CREATED');
                                                                                    console.log(createdCustomer);
                                                                                    Price.remove({}, function (err) {
                                                                                        if (err) {
                                                                                            console.log('PRICES NOT REMOVED');
                                                                                        } else {
                                                                                            console.log('ALL PRICES REMOVED');
                                                                                            Price.create(data_price[0], (err, createdPrice) => {
                                                                                                if (err) {
                                                                                                    console.log(err);
                                                                                                } else {
                                                                                                    console.log('PRICE CREATED');
                                                                                                    console.log(createdPrice);
                                                                                                }
                                                                                            });
                                                                                        }});
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

module.exports = seedDB;