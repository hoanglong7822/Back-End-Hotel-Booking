const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    date: { type: String, required: true },
    verified: { type: Boolean, default: false },
});
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
        data: [reviewSchema],
    },
});

const Hotels = mongoose.model('Hotels', hotelSchema);
module.exports = Hotels;
