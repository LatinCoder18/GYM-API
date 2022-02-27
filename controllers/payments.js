const Payment = require('../models/payment');
const Client = require('../models/client');
const allowedMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let payments = [];
let ids = [];
module.exports = {
    createPayment: async (req, res) => {
        const { amount, client, months, comment, discount } = req.body
        for (const month of months) {
            if (!allowedMonths.includes(month)) {
                return res.status(400).json({
                    message: `El mes ${month} no es válido los meses válidos son ${allowedMonths}`
                })
            }
        }
        if (Array.isArray(months)) {
            for (const element of months) {
                const data = {
                    amount, client, month: element, comment, discount
                }
                const payment = new Payment(data);
                await payment.save();
                payments.push(payment);
                ids.push(payment._id);
            }   
        }        
        let cliente = await Client.findById(client);
        let objectIdArray = cliente.payments.map(s => s.toString());
        let newArray = ids.map(s => s.toString());
        const arr = Array.prototype.concat(objectIdArray, newArray);
        cliente.payments = [...new Set(arr)];
        await cliente.save();
        return res.status(201).json({ payments });
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
    getPayments: async (req, res) => {
        const { id } = req.params
        const payments = await Payment.find({ $and: [{ status: true }, { client: id }] }).populate('client');
        if (!payments) {
            return res.status(400).json({ msg: 'Payments not found' });
        }
        res.json(payments);
    }
}