const { isValidObjectId } = require("mongoose");
const Client = require('../models/client');

const allowedCollections = [
    'clients'
    
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
        default:
            return res.status(500).json({ msg: 'Coleccion Pendiente A Realizar' })
            break;
    }

}
const searchClient = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');

    if (isValidObjectId(term)) {
        const client = await Client.findById(term);
        return res.json({ results: (user) ? user : [] })
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
module.exports = { search }