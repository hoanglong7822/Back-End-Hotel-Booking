const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelCode: Number,
    images: [
        {
            imageUrl: String,
            accessibleText: String,
        },
    ],
    title: String,
    subtitle: String,
    benefits: [String],
    price: String,
    ratings: String,
    city: String,
    reviews: {
        data: [
            {
                reviewerName: String,
                rating: Number,
                review: String,
                date: Date,
                verified: Boolean,
            },
        ],
    },
});

const Hotels = mongoose.model('Hotels', hotelSchema);
module.exports = Hotels;
