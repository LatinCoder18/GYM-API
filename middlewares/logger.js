require('colors')

const logger = (req, res, next) => {
    
    console.log('Method:', req.method.green,'Path: ', req._parsedUrl.path.green, 'Time:'.green, Date.now(), 'IP', req.ip.red);
    next();
}
module.exports = {
    logger,
}