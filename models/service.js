/**
 * Created by winter on 6/29/2017.
 */

const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    date: {type: String, required: true, minlength: 1},
    hour: {type: String, required: true, minlength: 1},
    price: {type: String, minlength: 1},
    completed: {type: String, minlength: 1, default: 'false'},
    addons: [String],
    keyPlace: {type: String},
    instructions: {type: String},
    rating: {type: String, minlength: 1},
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        }
    ]
});

module.exports = mongoose.model("Service", ServiceSchema);