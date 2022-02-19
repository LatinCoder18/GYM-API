
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers } = require('../controllers/users');
var path = require('path');
const router = Router();

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/public/views/home.html',)
})

module.exports = router; 