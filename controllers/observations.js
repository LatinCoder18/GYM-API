const Observation = require('../models/observation');

module.exports = {
    createObservation: async (req, res) => {
        const { icc, imc, weight, observations, client } = req.body
        const data = {
            icc, imc, weight, observation: observations, client
        }
        const observation = new Observation(data);
        await observation.save();
        return res.status(201).json({ observation });
    },
    removeObservation: async (req, res) => {
        const { id } = req.params;
        const observation = await Observation.findByIdAndUpdate(id, { status: false });
        if (!observation) {
            return res.status(400).json({ msg: 'Observation not found' });
        }
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
}