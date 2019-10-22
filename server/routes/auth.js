const router = require('express').Router();

const {
    register,
    login
} = require('../controller/auth.controller');

//Register
router.post('/register', register);
//Login
router.post('/login', login);

module.exports = router;