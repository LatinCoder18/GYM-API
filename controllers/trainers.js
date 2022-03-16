const { response } = require('express')
const User = require('../models/user');
const Client = require('../models/client');
const bcryptjs = require('bcryptjs');

module.exports = {
    create: async (req, res = response) => {
        //return res.status(403).json({ msg: 'User registration is not allowed now' })
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //Guardar en la base de datos
        await user.save();
        delete user.password;
        // generar JWT
        res.json({
            user
        })
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { _id, __v, password, ...rest } = req.body;
        if (password) {
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }
        await User.findByIdAndUpdate(id, rest);
        const updated = await User.findById(id);
        delete updated.password;
        res.json({
            client: updated
        })
    },
    read: async (req, res = response) => {
        //return res.status(403).json({ msg: 'User registration is not allowed now' })
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({
            user
        })
    },
    remove: async (req, res = response) => {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { status: false });
        res.json({
            msg: 'Trainer deleted'
        })
    },
    list: async (req, res = response) => {
        const users = await User.find({ $and: [{ status: true }, { rol: 'TRAINEE_ROLE' }] });
        res.json({
            users
        })
    },
    readUsers: async (req, res = response) => {
        const { id } = req.params;
        const clients = await Client.find({ $and: [{ status: true }, { rol: 'TRAINEE_ROLE' }, { trainer: id }] });
        res.json({
            clients
        })
    }

}
