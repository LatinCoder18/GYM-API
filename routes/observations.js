const { Router } = require('express');
const { check } = require('express-validator');
const { createObservation, getObservation, removeObservation } = require('../controllers/observations');
const { existClient } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT')
const { isRole } = require('../middlewares/validateRol');
const router = Router();

router.get('/:id', [validateJWT, check('id', 'El id de mongo debe ser valido').isMongoId(), validateFields], getObservation);
router.post('/', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('client', 'Debes enviar el id del cliente').not().isEmpty().bail().custom(existClient),
    check('observations', 'Debes enviar almenos una observacion').not().isEmpty(),
    check('client','Debe introducir un Id de mongo correcto').isMongoId(),
    validateFields
], createObservation);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id de mongo debe ser valido').isMongoId(),
    isRole('ADMIN_ROLE'),
    validateFields],
    removeObservation);

module.exports = router;