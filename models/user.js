const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        default: 'no-avatar.png',
    },
    rol: {
        type: String,
        default:'TRAINEE_ROLE',
        emun: ['ADMIN_ROLE', 'TRAINEE_ROLE'] 
    },
    status: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password,_id, ...user } = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model('User', UsuarioSchema);