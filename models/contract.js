/**
 * Created by winter on 7/10/2017.
 */

const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
    frequency: {type: String, required: true, minlength: 1},
    active: {type: String, default: 'yes'},
    date: {type: Date, default: Date.now},
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
});

module.exports = mongoose.model("Contract", ContractSchema);