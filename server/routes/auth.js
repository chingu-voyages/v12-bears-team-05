const router = require("express").Router();

const { register, login, profile } = require("../controller/auth.controller");

//Register
router.post("/register", register);
//Login
router.post("/login", login);

router.get("/profile", profile);

module.exports = router;
