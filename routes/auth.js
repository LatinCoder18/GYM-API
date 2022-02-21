const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { existEmail } = require('../helpers/dbValidators');
const { isRole } = require('../middlewares/validateRol');
const router = Router();
/**
 * Route to login
 * @name POST /api/auth/login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {object} JWT
 */
router.post('/login',
    [
        check('email', 'You must provide an user id').isEmail(),
        check('password', 'You must provide an user password'), validateFields
    ],
    login);
/**
 * Route to register
 * @name POST /api/auth/register
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User name
 * @param {string} role - User role
 * @returns {object} User
 * @returns {object} JWT
 * 
 */
router.post('/register', [check('email', 'You must provide an user id').isEmail(),
check('password', 'You must provide an user password'),
check('name', 'You must provide an user name'),
check('email').custom(existEmail), isRole('ADMIN_ROLE'), validateFields], register);

module.exports = router;
