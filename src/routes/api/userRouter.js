const express = require('express');
const Router = express.Router();
const { verify } = require('../../middleware/verifyMiddleware');
const { bookings, paymentMethods } = require('../../controllers/userCotrollers');
Router.get('/users/bookings/:userId', verify, bookings);
Router.get('/users/payment-methods', paymentMethods);
module.exports = Router;
