const express = require('express');
const router = express.Router();

const authRoute = require('./auth');

router.use('/user/auth',authRoute);

module.exports = router;
