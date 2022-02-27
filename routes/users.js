
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers } = require('../controllers/users');
const validateFields = require('../middlewares/validateFields');
const router = Router();

router.get('/', getUsers)
/**
 * Validar que sea Administrador
 * Validar que sea un mongoid valido
 * Validar que el usuario exista
 * Validar que el usuario no esté betado
 */
router.put('/:id', (req, res) => {
    res.send('Hola');
})
/**
 * 
 * Validar que sea Administrador
 * Validar que sea un mongoid valido
 * 
 * */
router.delete('/:id', (req, res) => {
    res.send('Hola');
})
module.exports = router; 