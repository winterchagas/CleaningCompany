/**
 * Created by winter on 6/29/2017.
 */

const mongoose              = require("mongoose"),
      passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 1},
    email: {type: String, required: true, minlength: 1, unique: true},
    password: {type: String, required: true, minlength: 1}

});

AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin", AdminSchema);