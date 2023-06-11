const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");
const PriceType = require("../models/priceType");

const addPriceType = async (req, res) => {
    try {
        const { price_per_day, price_per_hour, late_fee_per_hour } = req.body;
        const newPriceType = await PriceType({
            price_per_day,
            price_per_hour,
            late_fee_per_hour,
        });

        await newPriceType.save();
        res.status(200).send({ message: "Yangi priceType qoshildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getPriceTypes = async (req, res) => {
    try {
        const priceTypes = await PriceType.find({});
        if (!priceTypes) {
            return res.status(400).send({ message: "PriceTypelar topilmadi" });
        }
        res.json(priceTypes);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getPriceTypesById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const priceType = await PriceType.findOne({ _id: req.params.id });
        if (!priceType) {
            return res.status(400).send({ message: "PriceType topilmadi" });
        }
        res.json(priceType);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updatePriceType = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const priceType = await PriceType.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    price_per_day: req.body.price_per_day,
                    price_per_hour: req.body.price_per_hour,
                    late_fee_per_hour: req.body.late_fee_per_hour,
                },
            }
        );
        if (!priceType) {
            return res.status(400).send({ message: "PriceType topilmadi" });
        }
        res.json({ message: "Update qilindi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deletePriceType = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const priceType = await PriceType.deleteOne({ _id: req.params.id });
        if (!priceType) {
            return res.status(400).send({ message: "PriceType topilmadi" });
        }
        res.json({ message: "PriceType o'chirildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addPriceType,
    getPriceTypes,
    getPriceTypesById,
    updatePriceType,
    deletePriceType,
};
