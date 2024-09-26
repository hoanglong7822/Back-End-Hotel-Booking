const express = require('express');
const Router = express.Router();
Router.use('/api', require('./api/authRoute'));
Router.use('/api', require('./api/checkoutRoute'));
Router.use('/api', require('./api/homeRoute'));
Router.use('/', require('./api/hotelRouter'));
Router.use('/api', require('./api/userRouter'));
module.exports = Router;
