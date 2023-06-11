const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        passport: {
            type: Number,
            required: true,
        },
        driverLicense: {
            type: Boolean,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            validate: {
                validator: function (value) {
                    return /\d{2}-\d{3}-\d{2}-\d{2}/.test(value);
                },
                message: (props) => `${props.value} - raqam notogri`,
            },
            maxLength: 12,
        },
    },
    {
        versionKey: false,
    }
);

module.exports = model("Client", clientSchema);
