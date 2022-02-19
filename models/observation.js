const { Schema, model } = require('mongoose');
const ObservationSchema = Schema({
    datetime: {
        type: String,
        default: new Date().toLocaleString()
    },
    icc: {
        type: Number,
    },
    imc: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    observation: {
        type: String
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