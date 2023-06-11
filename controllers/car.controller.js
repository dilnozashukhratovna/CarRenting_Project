const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");
const Car = require("../models/car");

const addCar = async (req, res) => {
    try {
        const { carNumber, make, model, year, mileage, priceTypeId } = req.body;
        const newCar = await Car({
            carNumber,
            make,
            model,
            year,
            mileage,
            priceTypeId,
        });

        await newCar.save();
        res.status(200).send({ message: "Yangi car qoshildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        if (!cars) {
            return res.status(400).send({ message: "Carlar topilmadi" });
        }
        res.json(cars);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getCarsById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const car = await Car.findOne({ _id: req.params.id });
        if (!car) {
            return res.status(400).send({ message: "Car topilmadi" });
        }
        res.json(car);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateCar = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const car = await Car.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    carNumber: req.body.carNumber,
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    mileage: req.body.mileage,
                    priceTypeId: req.body.priceTypeId,
                },
            }
        );
        if (!car) {
            return res.status(400).send({ message: "Car topilmadi" });
        }
        res.json({ message: "Update qilindi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteCar = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const car = await Car.deleteOne({ _id: req.params.id });
        if (!car) {
            return res.status(400).send({ message: "Car topilmadi" });
        }
        res.json({ message: "Car o'chirildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addCar,
    getCars,
    getCarsById,
    updateCar,
    deleteCar,
};
