const { isValidObjectId } = require("mongoose");
const Client = require('../models/client');
const Payment = require('../models/payment');
const Observation = require('../models/observation');
const allowedCollections = [
    'clients',
    'observations',
    'payments'
]

const search = async (req, res) => {
    const { term, colection } = req.params;
    if (!allowedCollections.includes(colection)) {
        return res.status(500).send({
            msg: `Las coleciones permitidas son ${allowedCollections}`
        })
    }
    switch (colection) {
        case 'clients':
            await searchClient(term, res);
            break;
        case 'trainers':
            await searchTrainer(term, res);
            break;
        case 'observations':
            await searchObservation(term, res);
            break;
        case 'payments':
            await searchPayment(term, res);
            break;
        default:
            return res.status(500).json({ msg: 'Coleccion Pendiente A Realizar' })
            break;
    }

}
const searchClient = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');

    if (isValidObjectId(term)) {
        const client = await Client.findById(term);
        return res.json({ results: (client) ? client : [] })
    } else {
        const client = await Client.find({ $or: [{ firstname: regex }, { lastname: regex }], $and: [{ estado: true }] });
        return res.json({ results: (client) ? client : [] })
    }
}
const searchTrainer = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');

    if (isValidObjectId(term)) {
        const categorie = await Categorie.findById(term);
        return res.json({ results: (categorie) ? categorie : [] })
    } else {
        const categorie = await Categorie.find({ name: term });
        return res.json({ results: (categorie) ? categorie : [] })
    }
}
const searchPayment = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');

    if (isValidObjectId(term)) {
        const payment = await Payment.findById(term);
        return res.json({ results: (payment) ? payment : [] })
    } else {
        const payment = await Payment.find({ $or: [{ comment: regex }, { month: regex }] });
        return res.json({ results: (payment) ? payment : [] })
    }
}
const searchObservation = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');

    if (isValidObjectId(term)) {
        const observation = await Observation.findById(term);
        return res.json({ results: (observation) ? observation : [] })
    } else {
        const observation = await Observation.find({ $or: [{ observation: regex }] });
        return res.json({ results: (observation) ? observation : [] })
    }
}
module.exports = { search }