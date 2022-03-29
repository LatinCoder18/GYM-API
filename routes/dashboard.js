const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { existEmail } = require('../helpers/dbValidators');
const { isRole } = require('../middlewares/validateRol');
const { validateJWT } = require('../middlewares/validateJWT');
const { stats } = require('../controllers/dashboard');
const router = Router();

router.get('/stadistics', [validateJWT], stats);

module.exports = router;
