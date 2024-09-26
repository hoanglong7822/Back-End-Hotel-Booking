const express = require('express');
const { login, register, logout } = require('../../controllers/authController');
const Router = express.Router();
Router.post('/users/login', login);
Router.post('/users/logout', logout);
Router.post('/users/register', register);

module.exports = Router;
