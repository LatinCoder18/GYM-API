const Payment = require('../models/payment');
const Client = require('../models/client');
const User = require('../models/user');
const moment = require('moment');
module.exports = {
    stats: async (req, res) => {
        /**
         * Obtener lista de usuarios
         * Obtener lista de Clientes
         * Obtener lista de Pagos
         * Obtener pagos de lmes actual
         */
        const clients = await Client.find({ $and: [{ status: true }] });
        const trainers = await User.find({ $and: [{ status: true }, { rol: "TRAINEE_ROLE" }] });
        const payments = await Payment.find({ status: true });
        let newclients = [];
        let newtrainers = [];
        let newpayments = 0;
        const month = moment().format("MM")

        for (const client of clients) {
            const clientmonth = moment(client.datetime, "MM/DD/YYYY").format("MM");
            if (month == clientmonth) {
                newclients.push(client)
            }
        }
        for (const trainer of trainers) {
            const trainermonth = moment(trainer.datetime, "MM/DD/YYYY").format("MM");
            if (month == trainermonth) {
                newtrainers.push(trainer)
            }
        }
        for (const payment of payments) {
            const paymentmonth = moment(payment.datetime, "MM/DD/YYYY").format("MM");
            if (month == paymentmonth) {
               newpayments =  newpayments + payment.amount;
            }
        }
        res.status(200).json({
            clients: clients.length,
            newclients: newclients.length,
            trainers: trainers.length,
            newtrainers: newtrainers.length,
            newpayments
        })
    }
}