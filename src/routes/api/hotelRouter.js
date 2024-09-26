const express = require('express');
const Router = express.Router();
const {
    getHotels,
    reviews,
    verticalFilters,
    country,
    getCountry,
    hotelDetails,
    enquiry,
    addReviews,
} = require('../../controllers/hotelsControllers');
Router.post('/api/hotels', getHotels);
Router.post('/api/hotel/:hotelId/reviews', reviews);
Router.post('/api/hotel/add-review', addReviews);
Router.post('/api/country', country);
Router.get('/misc/countries', getCountry);
Router.get('/api/hotels/verticalFilters', verticalFilters);
Router.get('/api/hotel/:hotelId', hotelDetails);
Router.get('/api/hotel/:hotelId/booking/enquiry', enquiry);

module.exports = Router;
