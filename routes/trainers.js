const { Router } = require('express');
const { check } = require('express-validator');
const { create, list, read, remove, update,readUsers } = require('../controllers/trainers');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { existEmail } = require('../helpers/dbValidators');
const { isRole } = require('../middlewares/validateRol');
const router = Router();



router.post('/', [
    check('email', 'You must provide an user id').isEmail(),
    check('password', 'You must provide an user password'),
    check('name', 'You must provide an user name'),
    check('email').custom(existEmail), validateJWT, isRole('ADMIN_ROLE'), validateFields
], create);
router.get('/', [validateJWT,isRole('ADMIN_ROLE', 'TRAINEE_ROLE'), validateFields], list);
router.get('/:id', [validateJWT, isRole('ADMIN_ROLE', 'TRAINEE_ROLE'),check('id', 'El id debe ser un id de mongo valido').isMongoId(), validateFields], read);
router.get('/users/:id', [validateJWT, isRole('ADMIN_ROLE', 'TRAINEE_ROLE'),check('id', 'El id debe ser un id de mongo valido').isMongoId(), validateFields], readUsers);
router.put('/:id', [validateJWT, isRole('ADMIN_ROLE'),check('id', 'El id debe ser un id de mongo valido').isMongoId(), validateFields], update);
router.delete('/:id', [validateJWT, isRole('ADMIN_ROLE'), validateFields], remove);
module.exports = router;
