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
            total = total - (total * (freqVal * (foundPrice.per_frequency)));
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

// formHelper.updateCustomer = async (id, value) => {
//     console.log('INSIDE UPDATE CUSTOMER')
//     Customer.findByIdAndUpdate(id, value).exec()
//         .then((upCust) => {
//             console.log('CUSTOMER UPDATED',  upCust)
//             return upCust;
//         }).catch((err) => {
//         console.log('CUSTOMER FAILED TO UPDATE',  err)
//         throw new Error('FAILED TO UPDATE CUSTOMER', err);
//     });
// };

formHelper.updateCustomer = (id, ...values) => {
    return new Promise((resolve, reject) => {
        Customer.findById(id, function (err, foundCust) {
            if (err) {
                console.log('CUSTOMER not UPDATED',  err)
                reject('FAILED TO UPDATE CUSTOMER', err);
            }
            for (const value of values) {
                foundCust[Object.keys(value)[0]] = value[Object.keys(value)[0]];
            }

            foundCust.save(function (err, upCust) {
                if (err) {
                    console.log('FAILED TO SAVE CUSTOMER IN DB', err);
                    reject('FAILED TO SAVE CUSTOMER IN DB', err);
                }
                console.log('CUSTOMER UPDATED',  upCust)
                resolve(upCust);
            });
        });
    });


    // return Customer.findByIdAndUpdate(id, value, function (err, upCust) {
    //     if (err) {
    //         console.log('CUSTOMER not UPDATED',  err)
    //         throw new Error('FAILED TO UPDATE CUSTOMER', err);
    //     } else {
    //         console.log('CUSTOMER UPDATED',  upCust)
    //         return upCust;
    //     }
    // })
};

module.exports = {formHelper};