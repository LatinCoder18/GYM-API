const { Schema, model } = require('mongoose');


const PaymentSchema = Schema({
    datetime: {
        type: String,
        default: new Date().toLocaleDateString()
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
    status: {
        type: Boolean,
        default: true,
    }
});


module.exports = model('Payment', PaymentSchema);