const router = require("express").Router();
const { celebrate } = require("celebrate");

const { user: userValidator } = require("../joiSchema");
const { register, login, profile } = require("../controller/userController");

//Register
router.post("/register", celebrate(userValidator.register), register);
//Login
router.post("/login", celebrate(userValidator.login), login);

router.get("/profile", celebrate(userValidator.profile), profile);

module.exports = router;
