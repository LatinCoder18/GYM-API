const { response } = require('express')
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generateJWT');
const { ObjectId } = require('mongoose');


module.exports = {
    login: async (req, res = response) => {
        const { email, password } = req.body;
        try {
            // verificar si el correo existe
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    msg: 'El usuario / password no son validos',
                })
            }
            // si el usuario está activo

            if (!user.status) {
                return res.status(400).json({
                    msg: 'The user is banned from our server',
                })
            }
            // verificar la contraseña
            const ValidPassword = bcryptjs.compareSync(password, user.password);
            if (!ValidPassword) {
               return res.status(400).json({
                    msg: 'Usuario/ Password no son correctos',
                })
            }
            // generar JWT
            const token = await generarJWT(user.id)

            res.json(
                {
                    user,
                    token
                }
            )
        } catch (error) {
            return res.status(500).send({
                msg: 'Internal server error'
            })
        }

    },

    register: async (req, res = response) => {
        //return res.status(403).json({ msg: 'User registration is not allowed now' })
        const { name, email, password } = req.body;
        const user = new User({ name, email, password, rol: 'ADMIN_ROLE' });
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //Guardar en la base de datos
        await user.save();
        delete user.password;
        // generar JWT
        //const uid = ObjectId(user._id);
        const jwt = await generarJWT(user._id.toString());
        res.json({
            user, jwt
        })
    }
}
