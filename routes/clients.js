const { Router } = require('express');
const { check } = require('express-validator');
const { createClient, getClients, getClient, updateClient, removeClient, updateClientPayment, updateClientObservation } = require('../controllers/clients');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { existClient, verifyPayments, verifyObservations, isAllowedService } = require('../helpers/dbValidators');
const { isRole } = require('../middlewares/validateRol');
const router = Router();

router.get('/', [validateJWT, isRole('ADMIN_ROLE', 'TRAINEE_ROLE')], getClients);
router.get('/:id', [validateJWT, check('id', 'El id debe ser un id de mongo valido').isMongoId().bail().custom(existClient), isRole('ADMIN_ROLE', 'TRAINEE_ROLE'), validateFields], getClient);
router.put('/:id', [validateJWT, check('id', 'El id debe ser un id de mongo valido').isMongoId().bail().custom(existClient), isRole('ADMIN_ROLE', 'TRAINEE_ROLE'), validateFields], updateClient);
router.delete('/:id', [validateJWT, check('id', 'El id debe ser un id de mongo valido').isMongoId().bail().custom(existClient), isRole('ADMIN_ROLE'), validateFields], removeClient);
//*firstname, lastname, age, height, weight, email, datetime, phone, imc, icc, services
router.post('/', [validateJWT, isRole('ADMIN_ROLE'), check('firstname', 'El campo es requrido').notEmpty(), check('services', 'Es obligatorio seleccionar el servicio').notEmpty().custom(c => isAllowedService(c, ['AEROBICS', 'MASSAGE', 'TRAINING'])), validateFields], createClient);

module.exports = router;