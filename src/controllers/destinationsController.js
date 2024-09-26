const popularDestinations = require('../models/popularDestinationsModel');
const Hotels = require('../models/hotelsModel');

const getPopularDestinations = async (req, res) => {
    try {
        const _popularDestinations = await popularDestinations.find();
        res.status(200).send({
            errors: [],
            data: {
                elements: _popularDestinations,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Create popularDestinations
const nearbyHotels = async (req, res) => {
    try {
        const _nearbyHotels = await Hotels.find({ city: 'pune' });
        res.status(200).send({
            errors: [],
            data: {
                elements: _nearbyHotels,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
const availableCities = async (req, res) => {
    try {
        // const _availableCities = await Hotels.find({ city: 'pune' });
        res.status(200).json({
            errors: [],
            data: {
                elements: ['pune', 'bangalore', 'mumbai'],
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getPopularDestinations,
    nearbyHotels,
    availableCities,
};
