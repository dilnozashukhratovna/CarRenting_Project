const { default: mongoose } = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");
const Client = require("../models/client");

const addClient = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            birthday,
            passport,
            driverLicense,
            address,
            phone,
        } = req.body;

        const newClient = await Client({
            firstName,
            lastName,
            birthday,
            passport,
            driverLicense,
            address,
            phone,
        });

        await newClient.save();
        res.status(200).send({ message: "Yangi client qoshildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getClients = async (req, res) => {
    try {
        const clients = await Client.find({});
        if (!clients) {
            return res.status(400).send({ message: "Clientlar topilmadi" });
        }
        res.json(clients);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getClientsById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const client = await Client.findOne({ _id: req.params.id });
        if (!client) {
            return res.status(400).send({ message: "Client topilmadi" });
        }
        res.json(client);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateClient = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const client = await Client.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthday: req.body.birthday,
                    passport: req.body.passport,
                    driverLicense: req.body.driverLicense,
                    address: req.body.address,
                    phone: req.body.phone,
                },
            }
        );
        if (!client) {
            return res.status(400).send({ message: "Client topilmadi" });
        }
        res.json({ message: "Update qilindi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteClient = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send({ message: "Incorrect ID" });
        }
        const client = await Client.deleteOne({ _id: req.params.id });
        if (!client) {
            return res.status(400).send({ message: "Client topilmadi" });
        }
        res.json({ message: "Client o'chirildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addClient,
    getClients,
    getClientsById,
    updateClient,
    deleteClient,
};
