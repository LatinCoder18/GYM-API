const User = require("../models/user");
const jwt = require('jsonwebtoken');
module.exports = {
    
    validateJWT: async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición',
            })
        }
        try {         
            
            
            const { uid } =  jwt.verify(token, process.env.SECRET);
            const user = await User.findById(uid);
            if (!user) {
                return res.status(401).json({
                    msg: 'Usuario no permitido'
                })
            }
            if (!user.status) {
                return res.status(401).json({
                    msg: 'Usuario no permitido'
                })
            }
            req.uid = uid;
            req.user = user
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Usted no tiene acceso para acceder aquí!!',
            })
        }
        //console.log(token)
    }
}