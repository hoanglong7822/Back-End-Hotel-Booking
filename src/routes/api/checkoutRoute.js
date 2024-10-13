const express = require('express');
const Router = express.Router();
const { checkoutInformation, createBooking } = require('../../controllers/checkoutController');
Router.post('/payments/confirmation', checkoutInformation);
Router.post('/users/createBooking', createBooking);
module.exports = Router;
