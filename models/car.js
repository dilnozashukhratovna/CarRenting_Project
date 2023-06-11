const { Schema, model } = require("mongoose");
const priceType = require("./priceType");

const carSchema = new Schema(
    {
        carNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Date,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        priceTypeId: {
            type: Schema.Types.ObjectId,
            ref: "PriceType",
        },
        subdepartment: priceType.schema,
    },
    {
        versionKey: false,
    }
);

module.exports = model("Car", carSchema);
