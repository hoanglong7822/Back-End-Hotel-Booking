const Booking = require('../models/bookingsModel');

const bookings = async (req, res) => {
    try {
        const _bookings = await Booking.find({ userId: req.params.userId });
        const bookings = [];
        const arrBookings = _bookings.forEach((item, index) => {
            bookings.push({
                bookingId: item._id,
                bookingDate: item.createdAt,
                hotelName: item.hotelName,
                checkInDate: item.checkIn,
                checkOutDate: item.checkOut,
                totalFare: item.total,
            });
        });
        res.send({ data: { elements: bookings } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const paymentMethods = (req, res) => {
    res.send({
        errors: [],
        data: {
            elements: [
                {
                    id: '1',
                    cardType: 'Visa',
                    cardNumber: '**** **** **** 1234',
                    expiryDate: '08/26',
                },
                {
                    id: '2',
                    cardType: 'MasterCard',
                    cardNumber: '**** **** **** 5678',
                    expiryDate: '07/24',
                },
                {
                    id: '3',
                    cardType: 'American Express',
                    cardNumber: '**** **** **** 9012',
                    expiryDate: '05/25',
                },
            ],
        },
    });
};
module.exports = { bookings, paymentMethods };
