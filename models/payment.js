const { Schema, model } = require('mongoose');


const PaymentSchema = Schema({
    datetime: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    days: {
        type: Number,
        required: [true, 'El número de días es obligatorio']
    },
    amount: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    comment: {
        type: String,
        default: 'Sin comentario'
    },
    discount:{
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
    }
});


module.exports = model('Payment', PaymentSchema);