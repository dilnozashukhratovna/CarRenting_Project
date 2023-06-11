const { Schema, model } = require("mongoose");

const priceTypeSchema = new Schema(
    {
        price_per_day: {
            type: Number,
            required: true,
            trim: true,
        },
        price_per_hour: {
            type: Number,
            required: true,
            trim: true,
        },
        late_fee_per_hour: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        versionKey: false,
    }
);

module.exports = model("PriceType", priceTypeSchema);
