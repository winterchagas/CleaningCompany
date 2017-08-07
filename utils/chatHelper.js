const moment   = require('moment'),
      Admin = require('../models/user_admin');

const chatObj = {};

chatObj.findAdmin = (email) => {
    return Admin.findOne({email: email})
        .then((foundEmp) => {
            if (foundEmp) {
                return true
            } else {
                return false
            }
        })
        .catch((err) => {
            return false
        });
};


chatObj.generateMessage = (from, fromRoom, text) => {
    return {
        from,
        fromRoom,
        text,
        createdAt: moment().valueOf()
    };
};

chatObj.isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = chatObj;
