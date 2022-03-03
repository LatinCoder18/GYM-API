const Observation = require('../models/observation');
const Client = require('../models/client');
module.exports = {
    createObservation: async (req, res) => {
        const { icc, imc, weight, observations, client } = req.body
        const data = {
            icc, imc, weight, observation: observations, client
        }
        const observation = new Observation(data);
        await observation.save();
        const cliente = await Client.findById(client);
        let objectIdArray = cliente.observations.map(s => s.toString());
        const arr = Array.prototype.concat(objectIdArray, [observation._id.toString()]);
        cliente.observations = [...new Set(arr)];
        await cliente.save();
        return res.status(201).json({ observation });
    },
    removeObservation: async (req, res) => {
        const { id } = req.params;
        const observation = await Observation.findByIdAndUpdate(id, { status: false });
        if (!observation) {
            return res.status(400).json({ msg: 'Observation not found' });
        }
        const cliente = await Client.findById(observation.client);
        const obs = [];
        for (const observationx of cliente.observations) {
            if (!(observationx == observation._id.toString())) {
                obs.push(observationx);
            }
        }
        cliente.observations = [...new Set(obs)];
        await cliente.save();
        return res.json(observation);
    },
    getObservation: async (req, res) => {
        const { id } = req.params
        const observation = await Observation.findById(id).populate('client');
        if (!observation) {
            return res.status(400).json({ msg: 'Observation not found' });
        }
        res.json(observation);
    },
    getObservations: async (req, res) => {
        const { id } = req.params
        const observation = await Observation.find({ $and: [{ status: true }, { client: id }] }).populate('client');
        if (!observation) {
            return res.status(400).json({ msg: 'Observations not found' });
        }
        res.json(observation);
    },
}