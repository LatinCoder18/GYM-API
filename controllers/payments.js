const Payment = require('../models/payment');

module.exports = {
    createPayment: async (req, res) => {
        const { amount, client } = req.body
        const data = {
            amount, client
        }
        const payment = new Payment(data);
        await payment.save();
        return res.status(201).json({ payment });
    },
    removePayment: async (req, res) => {
        const { id } = req.params;
        const payment = await Payment.findByIdAndUpdate(id, { status: false });
        if (!payment) {
            return res.status(400).json({ msg: 'Payment not found' });
        }
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