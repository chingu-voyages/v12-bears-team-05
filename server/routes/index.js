const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const recipeRouter = require('./recipeRoute');

router.use('/user', userRoute);
router.use('/recipe', recipeRouter);

module.exports = router;
