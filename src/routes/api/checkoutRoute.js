const express = require('express');
const Router = express.Router();
const {
    checkoutInformation,
    bookings,
    paymentMethods,
    createBooking,
} = require('../../controllers/checkoutController');
Router.post('/payments/confirmation', checkoutInformation);
Router.post('/users/bookings', bookings);
Router.post('/users/createBooking', createBooking);
Router.get('/users/payment-methods', paymentMethods);
module.exports = Router;
