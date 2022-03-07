const { isValidObjectId } = require("mongoose");
const Client = require("../models/client");
const User = require("../models/user");
const Payment = require("../models/payment");
const Observation = require("../models/observation");

module.exports = {
    existEmail: async (email) => {
        const user = await User.findOne({ email })
        if (user) {
            throw new Error(`El email ${email} esta en uso`);
        }
    },
    existClient: async (id) => {
        const client = await Client.findById(id)
        if (!client) {
            throw new Error(`El cliente con id ${id} no existe`);
        }
    },
    verifyPayments: async (payments) => {
        if (!Array.isArray(payments)) {
            throw new Error("El parámetro payments debe venir en la petición y debe ser un array de id de payments validos");
        }
        if (payments.length === 0) {
            throw new Error("El parámetro payments no puede estar vacío");
        }
        for (const payment of payments) {
            if (!isValidObjectId(payment)) {
                throw new Error("El parámetro payment debe ser un id de mongo valido");
            }
            const pago = await Payment.findById(payment);
            if (!pago) {
                throw new Error(`El pago con id ${payment} no existe`);
            }
        }

    },
    verifyObservations: async (observations) => {
        if (!Array.isArray(observations)) {
            throw new Error("El parámetro observations debe venir en la petición y debe ser un array de id de observations validos");
        }
        if (observations.length === 0) {
            throw new Error("El parámetro observations no puede estar vacío");
        }
        for (const observation of observations) {
            if (!isValidObjectId(observation)) {
                throw new Error("El parámetro observation debe ser un id de mongo valido");
            }
            const observ = await Observation.findById(observation);
            if (!observ) {
                throw new Error(`La observación con id ${observation} no existe`);
            }
        }
    },
    isAllowedColections: async (c, colections = []) => {
        if (!colections.includes(c)) {
            throw new Error(`La coleción a la que intentas subir el archivo no está  permitida en estos momentos`)
        }
    },
    isAllowedService: async (c, colections = []) => {
        if (!colections.includes(c)) {
            throw new Error(`El servicio al que se intenta añadir en este momento no está disponible`)
        }
    }


}