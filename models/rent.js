const { Schema, model } = require("mongoose");
const car = require("./car");
const client = require("./client");

const rentSchema = new Schema(
    {
        carId: {
            type: Schema.Types.ObjectId,
            ref: "Car",
        },
        subdepartment: car.schema,
        departments: [car.schema],

        clientId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
        },
        subdepartment: client.schema,
        departments: [client.schema],

        from_dateTime: {
            type: Date,
            required: true,
        },

        to_dateTime: {
            type: Date,
            required: true,
        },

        rent_status_id: {
            type: Number,
            required: true,
        },

        rent_type_id: {
            type: Number,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

module.exports = model("Rent", rentSchema);
