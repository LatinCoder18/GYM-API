const { isValidObjectId } = require("mongoose");
const Client = require('../models/client');
const Payment = require('../models/payment');
const Observation = require('../models/observation');
const Trainer = require('../models/user');
const allowedCollections = [
    'clients',
    'observations',
    'payments',
    'trainers'
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
        case 'trainers':
            await searchTrainer(term, res);
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
        const client = await Client.find({ $or: [{ firstname: regex }, { lastname: regex }], $and: [{ status: true }] });
        return res.json({ results: (client) ? client : [] })
    }
}
const searchTrainer = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');

    if (isValidObjectId(term)) {
        const trainer = await Trainer.findById(term);
        return res.json({ results: (trainer) ? trainer : [] })
    } else {
        const trainer = await Trainer.find({ $or: [{ name: regex }, { email: regex }], $and: [{ status: true },{rol:'TRAINEE_ROLE'}] });
        return res.json({ results: (trainer) ? trainer : [] })
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