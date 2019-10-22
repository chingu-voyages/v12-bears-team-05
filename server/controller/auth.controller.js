const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    registerValidation,
    loginValidation
} = require('../validation');


const register = async (req, res) => {

    //validating user
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking email already exist
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email already exist');

    //hasing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const saveUser = await user.save();
        res.send({
            user: saveUser._id
        });
    } catch (err) {
        res.status(400).send(err);
    }
}


const login = async (req, res) => {
    //validating login
    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

     //checking email already exist
     const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Email or password is incorrect');

    //password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

}

module.exports.register = register;
module.exports.login = login;