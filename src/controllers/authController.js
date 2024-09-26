const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const User = require('../models/userModel');
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = { email: email, password: password };
    const _User = await User.findOne({ email });
    if (!email || !password) {
        res.status(400).json('Wrong account and password');
    } else if ((email == _User.email) & (password == _User.password)) {
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
        res.status(200).json({
            errors: [],
            data: {
                token: token,
                isAuthenticated: true,
                userDetails: {
                    id: _User.id,
                    firstName: _User.firstName,
                    lastName: _User.lastName,
                    fullName: _User.fullName,
                    email: _User.email,
                    phone: _User.phone,
                    country: _User.country,
                    isPhoneVerified: _User.isPhoneVerified,
                    isEmailVerified: _User.isEmailVerified,
                },
            },
        });
    } else {
        res.status(400).json('Wrong account and password');
    }
};

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
    };
    const newUser = new User(user);
    await newUser.save();
    res.status(200).send({
        errors: [],
        user: newUser,
    });
};
const logout = async (req, res) => {
    res.status(200).send({
        errors: [],
        data: {
            status: 'User logged out successfully',
        },
    });
};

module.exports = { login, register, logout };
