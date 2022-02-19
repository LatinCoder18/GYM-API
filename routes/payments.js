const { Router } = require('express');
const { check } = require('express-validator');
const { createPayment, getPayment, removePayment } = require('../controllers/payments');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT')
const { isRole } = require('../middlewares/validateRol');
const router = Router();

router.get('/:id', [validateJWT, check('id', 'El id de mongo debe ser valido').isMongoId(), validateFields], getPayment);
router.post('/', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('amount', 'La debe especificar la cantidad del pago').not().isEmpty(),
    check('amount', 'La cantidad debe ser un numero').isNumeric(),
    check('client').isMongoId(),
    validateFields
], createPayment);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id de mongo debe ser valido').isMongoId(),
    isRole('ADMIN_ROLE'),
    validateFields],
    removePayment);

module.exports = router;