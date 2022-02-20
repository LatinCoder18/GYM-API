const Payment = require('../models/payment');
const Client = require('../models/client');
module.exports = {
    createPayment: async (req, res) => {
        const { amount, client } = req.body
        const data = {
            amount, client
        }
        const payment = new Payment(data);
        await payment.save();
        const cliente = await Client.findById(client);
        let objectIdArray = cliente.payments.map(s => s.toString());
        const arr = Array.prototype.concat(objectIdArray, [payment._id.toString()]);
        cliente.payments = [...new Set(arr)];
        await cliente.save();
        return res.status(201).json({ payment });
    },
    removePayment: async (req, res) => {
        const { id } = req.params;
        const payment = await Payment.findByIdAndUpdate(id, { status: false });
        if (!payment) {
            return res.status(400).json({ msg: 'Payment not found' });
        }
        const cliente = await Client.findById(payment.client);
        const pay = [];
        for (const paymentx of cliente.payments) {
            if (!(paymentx == payment._id.toString())) {
                pay.push(paymentx);
            }
        }
        cliente.observations = [...new Set(pay)];
        await cliente.save()
        return res.json(payment);
    },
    getPayment: async (req, res) => {
        const { id } = req.params
        const payment = await Payment.findById(id).populate('client');
        if (!payment) {
            return res.status(400).json({ msg: 'Payment not found' });
        }
        res.json(payment);
    },
}