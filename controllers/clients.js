const Client = require('../models/client');
const Payment = require('../models/payment');
const mongoose = require('mongoose')

module.exports = {

    /**
     * Obtener la lista de todos los clientes 
     */
    getClients: async (req, res) => {
        const { limit = 10, page = 0 } = req.query
        const clients = await Client.find({ status: true }).sort({ firstname: 'asc' }).limit(Number(limit)).skip(Number(page));
        res.json({ clients });
    },
    /**
     * Obtener un cliente
     */
    getClient: async (req, res) => {
        const { id } = req.params
        const client = await Client.findById(id).populate('trainer');
        if (!client) {
            return res.json({ msg: "Cliente no encontrado" });
        }
        res.json({ client })
    },
    createClient: async (req, res) => {
        const { firstname, lastname, age, height, weight, email, datetime, phone, imc, icc, services } = req.body
        const data = {
            firstname, lastname, age, height, weight, email, datetime, phone, imc, icc, services,
            trainer: req.user._id.toString()
        }
        const client = new Client(data);
        await client.save();
        return res.status(201).json({ client });

    },
    updateClient: async (req, res) => {
        const { id } = req.params;
        const { _id, observations, trainer, __v, ...rest } = req.body;
        const client = await Client.findByIdAndUpdate(id, rest);
        const updated = await Client.findById(id);
        res.json({
            client: updated
        })
    },
    updateClientPayment: async (req, res) => {
        const { id } = req.params;
        const { payment = [] } = req.body;
        const client = await Client.findById(id);
        if (!client) {
            return res.json({ msg: "Cliente no encontrado" });
        }
        let objectIdArray = client.payments.map(s => s.toString());
        const arr = Array.prototype.concat(objectIdArray, payment);
        client.payments = [...new Set(arr)];
        await client.save();
        return res.json({ client });
    },
    updateClientObservation: async (req, res) => {
        const { id } = req.params;
        const { observation } = req.body;
        const client = await Client.findById(id);
        if (!client) {
            return res.json({ msg: "Cliente no encontrado" });
        }
        let objectIdArray = client.observations.map(s => s.toString());
        const arr = Array.prototype.concat(objectIdArray, observation);
        client.observations = [...new Set(arr)];
        await client.save();
        return res.json({ client });
    },
    removeClient: async (req, res) => {
        const { id } = req.params;
        // Borrado Logico
        const client = await Client.findByIdAndUpdate(id, { status: false });
        res.json({ client })
    },

}