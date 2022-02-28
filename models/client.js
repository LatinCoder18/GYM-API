const { Schema, model } = require('mongoose');
const moment = require('moment');
const ClientSchema = Schema({
    firstname: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },
    age: {
        type: Number,
        required: [true, 'La edad es requerida']
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    email: {
        type: String,
    },
    datetime: {
        type: Date,
        default: new Date()
    },
    phone: {
        type: String,
    },
    imc: {
        type: String,
    },
    icc: {
        type: String,
    },
    services: [{
        type: String,
        required: true,
        default: 'TRAINING',
        emun: ['AEROBICS', 'MASSAGE', 'TRAINING']
    }],
    status: {
        type: Boolean,
        default: true,  // true = active, false = inactive
    },
    payments: [{
        type: Schema.Types.ObjectId,
        ref: 'Payment',
    }],
    observations: [{
        type: Schema.Types.ObjectId,
        ref: 'Observation',
    }],
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    img: {
        type: String,
        default: 'no-avatar.png',
    },
    servicedays:{
        type: Number,
        default: 0,
    }
});
ClientSchema.methods.toJSON = function () {
    const { ...client } = this.toObject();
    client.active = (client.servicedays > 0) ? true : false;
    client.activeto = moment(new Date()).add(client.servicedays,'days').format("DD/MM/YYYY");
    return client;
}

module.exports = model('Client', ClientSchema);