/**
 * Created by winter on 6/29/2017.
 */

const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
    state: {type: String, required: true, minlength: 1},
    city: {type: String, required: true, minlength: 1},
    zipcode: {type: String, required: true, minlength: 5},
    street_address: {type: String, required: true, minlength: 1},
    apt: {type: String, minlength: 1},
    bedrooms: {type: String, required: true, minlength: 1},
    bathrooms: {type: String, required: true, minlength: 1},
    // size: Number,
    full_address: {type: String, unique: true, required: true}
});

module.exports = mongoose.model("House", HouseSchema);