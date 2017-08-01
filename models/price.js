/**
 * Created by winter on 7/10/2017.
 */

const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
    region: String,
    base_price: Number,
    per_bedroom: Number,
    per_bathroom: Number,
    per_frequency: Number,
    discount: Number,
        windows: Number,
        fridge: Number,
        oven: Number,
        dishes: Number,
        eco: Number,
        carpet: Number,
        laundry: Number,
        deep: Number,
        move_out: Number
});

module.exports = mongoose.model("Price", PriceSchema);