const mongoose = require('mongoose');

const popularDestinationsSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Please enter a code'],
        },
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const popularDestinations = mongoose.model('popularDestinations', popularDestinationsSchema);
module.exports = popularDestinations;
