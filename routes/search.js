const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers/search');
const {validateFields} = require('../middlewares/validateFields');
const {validateJWT} = require('../middlewares/validateJWT');
const { isRole } = require('../middlewares/validateRol');
const router = Router();
router.get('/:colection/:term',[validateJWT,isRole('ADMIN_ROLE'),validateFields], search);
module.exports = router;