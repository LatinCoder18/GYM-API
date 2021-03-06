const { Router } = require('express');
const { check } = require('express-validator');
const { createPayment, getPayment, removePayment, getPayments } = require('../controllers/payments');
const { existClient } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT')
const { isRole } = require('../middlewares/validateRol');
const router = Router();

router.get('/:id', [validateJWT, check('id', 'El id de mongo debe ser valido').isMongoId(), validateFields], getPayment);
router.get('/user/:id', [validateJWT, check('id', 'El id de mongo debe ser valido').isMongoId(), validateFields], getPayments);
router.post('/', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('amount', 'La debe especificar la cantidad del pago').not().isEmpty(),
    check('client', 'La debe especificar la cantidad de meses pagadas').not().isEmpty(),
    check('amount', 'La cantidad debe ser un numero').isNumeric(),
    check('months', 'La cantidad debe ser un numero').isNumeric(),
    check('client').isMongoId().bail().custom(existClient),
    validateFields
], createPayment);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id de mongo debe ser valido').isMongoId(),
    isRole('ADMIN_ROLE'),
    validateFields],
    removePayment);

module.exports = router;