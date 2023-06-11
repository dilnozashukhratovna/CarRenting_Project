const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");
const Rent = require("../models/rent");

const addRent = async (req, res) => {
    try {
        const {
            carId,
            clientId,
            from_dateTime,
            to_dateTime,
            rent_status_id,
            rent_type_id,
            amount,
        } = req.body;

        const newRent = await Rent({
            carId,
            clientId,
            from_dateTime,
            to_dateTime,
            rent_status_id,
            rent_type_id,
            amount,
        });

        await newRent.save();
        res.status(200).send({ message: "Yangi rent qoshildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getRents = async (req, res) => {
    try {
        const rents = await Rent.find({});
        if (!rents) {
            return res.status(400).send({ message: "Rentlar topilmadi" });
        }
        res.json(rents);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getRentsById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const rent = await Rent.findOne({ _id: req.params.id });
        if (!rent) {
            return res.status(400).send({ message: "Rent topilmadi" });
        }
        res.json(rent);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateRent = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const rent = await Rent.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    carId: req.body.carId,
                    clientId: req.body.clientId,
                    from_dateTime: req.body.from_dateTime,
                    to_dateTime: req.body.to_dateTime,
                    rent_status_id: req.body.rent_status_id,
                    rent_type_id: req.body.rent_type_id,
                    amount: req.body.amount,
                },
            }
        );
        if (!rent) {
            return res.status(400).send({ message: "Rent topilmadi" });
        }
        res.json({ message: "Update qilindi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteRent = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const rent = await Rent.deleteOne({ _id: req.params.id });
        if (!rent) {
            return res.status(400).send({ message: "Rent topilmadi" });
        }
        res.json({ message: "Rent o'chirildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addRent,
    getRents,
    getRentsById,
    updateRent,
    deleteRent,
};
