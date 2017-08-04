/**
 * Created by winter on 6/29/2017.
 */

const mongoose              = require("mongoose"),
      passportLocalMongoose = require('passport-local-mongoose');

const CustomerSchema = new mongoose.Schema({
    email: {type: String, required: true, minlength: 1, unique: true},
    password: {type: String},
    name: {type: String, required: true, minlength: 1},
    phone: {type: String, required: true, minlength: 10},
    stripeID: {type: String, minlength: 1},
    card: {type: String, minlength: 1},
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    },
    dateCreated: {type: Date, default: Date.now}
});

CustomerSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
module.exports = mongoose.model("Customer", CustomerSchema);