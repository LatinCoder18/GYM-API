module.exports = {
    isRole: (...roles) => {
        return (req = request, res = response, next) => {
            if (!req.user) {
                return res.status(500).json({
                    msg: 'Ha ocurrido un error del servidor - ROLE BEFORE TOKEN'
                })
            }
            if (!roles.includes(req.user.rol)) {
                console.log(req.user.rol);
                return res.status(401).json({
                    msg: `${req.user.name} no tiene permiso para realizar esta acción`
                })
            }
            next();
        }
    }
}