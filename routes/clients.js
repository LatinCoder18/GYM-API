const { Router } = require('express');
const { check } = require('express-validator');
const { createClient, getClients, getClient, updateClient, removeClient, updateClientPayment, updateClientObservation } = require('../controllers/clients');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { existClient, verifyPayments, verifyObservations } = require('../helpers/dbValidators');
const { isRole } = require('../middlewares/validateRol');
const router = Router();

router.get('/', [validateJWT,isRole('ADMIN_ROLE','TRAINEE_ROLE')], getClients);
router.get('/:id', [validateJWT,check('id', 'El id debe ser un id de mongo valido').isMongoId().bail().custom(existClient), isRole('ADMIN_ROLE','TRAINEE_ROLE'),validateFields], getClient);
router.put('/:id', [validateJWT,check('id', 'El id debe ser un id de mongo valido').isMongoId().bail().custom(existClient), isRole('ADMIN_ROLE','TRAINEE_ROLE'),validateFields], updateClient);
router.delete('/:id', [validateJWT,check('id', 'El id debe ser un id de mongo valido').isMongoId().bail().custom(existClient), isRole('ADMIN_ROLE'),validateFields], removeClient);
router.post('/', [validateJWT,isRole('ADMIN_ROLE')], createClient);

module.exports = router;