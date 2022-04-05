const { Schema, model } = require('mongoose');
const moment = require('moment');
const ClientSchema = Schema({
    firstname: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        default: '',
    },
    age: {
        type: Number,
        default: 0,
    },
    height: {
        type: String,
        default: 0
    },
    weight: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        default: 'Sin correo',
    },
    datetime: {
        type: String,
        default: moment(new Date()).format("DD/MM/YYYY")
    },
    phone: {
        type: String,
        default: 0
    },
    imc: {
        type: String,
        default: 0
    },
    icc: {
        type: String,
        default: 0
    },
    services: {
        type: String,
        required: true,
        default: 'TRAINING',
        emun: ['AEROBICS', 'MASSAGE', 'TRAINING']
    },
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
    daysback: {
        type: Boolean,
        default: false
    },
    servicedays: {
        type: Number,
        default: 0,
    }
});
ClientSchema.methods.toJSON = function () {
    const { ...client } = this.toObject();
    client.active = (client.servicedays > 0) ? true : false;
    client.activeto = moment(new Date()).add(client.servicedays, 'days').format("DD/MM/YYYY");
    return client;
}

module.exports = model('Client', ClientSchema);