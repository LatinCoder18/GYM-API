const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { existEmail } = require('../helpers/dbValidators');
const { isRole } = require('../middlewares/validateRol');
const router = Router();
router.post('/login',
    [
        check('email', 'You must provide an user id').isEmail(),
        check('password', 'You must provide an user password'), validateFields
    ],
    login);
router.post('/register', [check('email', 'You must provide an user id').isEmail(),
check('password', 'You must provide an user password'),
check('name', 'You must provide an user name'),
check('email').custom(existEmail), isRole('ADMIN_ROLE'), validateFields], register);

module.exports = router;
