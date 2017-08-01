/**
 * Created by winter on 6/29/2017.
 */

const mongoose              = require("mongoose"),
      passportLocalMongoose = require('passport-local-mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    email: {type: String, required: true, minlength: 1, unique: true},
    phone: {type: String, required: true, minlength: 1, unique: true},
    password: {type: String, required: true, minlength: 1},
    image: String,
    rating: String,
    cleanings: {type: String, required: true, minlength: 1, default: '0'},
    isAdmin: {type: Boolean, default: false}
});

EmployeeSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Employee", EmployeeSchema);