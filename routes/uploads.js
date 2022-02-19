const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateProfilePic, showImage } = require('../controllers/uploads');
const { isAllowedColections } = require('../helpers/dbValidators');
const { validarArchivoSubir } = require('../middlewares/validateFile');
const validarCampos = require('../middlewares/validateFields').validateFields;
const { validateJWT } = require('../middlewares/validateJWT');
const { isRole } = require('../middlewares/validateRol');

const router = Router();
/**
 * Se puede hacer cualquier tipo de validacion
 */
//router.post('/',validarArchivoSubir, uploadFiles);
router.put('/:colection/:id', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('colection').custom(c => isAllowedColections(c, ['users', 'clients'])),
    validarCampos,
    validarArchivoSubir
], updateProfilePic);

router.get('/:colection/:id', [
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('colection').custom(c => isAllowedColections(c, ['users', 'clients'])),
    validarCampos
], showImage);
module.exports = router;