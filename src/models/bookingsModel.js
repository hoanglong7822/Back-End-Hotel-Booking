const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkIn: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    checkOut: { type: String, required: true },
    guests: { type: Number, required: true },
    hotelCode: { type: String, required: true },
    roomId: { type: String, required: true },
    hotelName: { type: String, required: true },
    total: { type: String, required: true },
    rooms: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
