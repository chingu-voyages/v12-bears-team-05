const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pick = require("lodash").pick;
const { registerValidation, loginValidation } = require("../validation");

const register = async (req, res) => {
  //validating user
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking email already exist
    const emailExist = await User.findOne({
      email: req.body.email
    });
    if (emailExist)
      return res.status(400).send({
        success: false,
        message: "Email already exist"
      });

    //hasing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });

    const saveUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    const userResp = pick(saveUser, ["name", "email"]);

    res.header("auth-token", token).send({
      success: true,
      user: userResp,
      token
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message
    });
  }
};

const login = async (req, res) => {
  //validating login
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking email already exist
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user)
      return res.status(400).send({
        success: false,
        message: "User does not exist"
      });

    //password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send({
        success: false,
        message: "Invalid password"
      });

    const userResp = pick(user, ["name", "email"]);

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({
      success: true,
      user: userResp,
      token
    });
  } catch (err) {
    res.status(400).send({
      succes: true,
      message: err.message
    });
  }
};

module.exports.register = register;
module.exports.login = login;
