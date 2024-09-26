const express = require('express');
const Router = express.Router();
const { getPopularDestinations, nearbyHotels, availableCities } = require('../../controllers/destinationsController');
Router.get('/popularDestinations', getPopularDestinations);
Router.get('/nearbyHotels', nearbyHotels);
Router.get('/availableCities', availableCities);
module.exports = Router;
