const { Schema, model } = require('mongoose');
const ObservationSchema = Schema({
    datetime: {
        type: String,
        default: new Date().toLocaleString()
    },
    icc: {
        type: Number,
        default: 0
    },
    imc: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    observation: {
        type: String,
        default: 'Sin observación'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});


module.exports = model('Observation', ObservationSchema);