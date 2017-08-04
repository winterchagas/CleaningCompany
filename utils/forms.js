const Price = require('../models/price'),
    Customer = require('../models/customer');
let formHelper = {};

formHelper.calcPrice = async (service, freq, city, bath, bed) => {
    let total, freqVal;
    if (freq === 'Weekly') {
        freqVal = 3
    }
    else if (freq === 'Biweekly') {
        freqVal = 2
    }
    else if (freq === 'Triweekly' || freq === 'Montly') {
        freqVal = 1
    }
    else {
        freqVal = 0
    }
    return Price.findOne({region: city})
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
            console.log('TOTAL PRICE:  ', total);
            return service;
        })
        .catch((err) => {
            throw new Error('Unable to search for prices.');
        });
};

formHelper.updateCustomer = async (id, value) => {
    Customer.findByIdAndUpdate(id, value)
        .then((upCust) => {
            return upCust;
        }).catch((err) => {
        throw new Error('FAILED TO UPDATE CUSTOMER', err);
    });
};

module.exports = {formHelper};