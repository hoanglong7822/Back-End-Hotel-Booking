const Booking = require('../models/bookingsModel');
const User = require('../models/userModel');
const checkoutInformation = (req, res) => {
    res.send({
        errors: [],
        data: {
            status: 'Payment successful',
            bookingDetails: [
                {
                    label: 'Booking ID',
                    value: 'BKG123',
                },
                {
                    label: 'Booking Date',
                    value: '2024-01-10',
                },
                {
                    label: 'Hotel Name',
                    value: 'Seaside Resort',
                },
                {
                    label: 'Check-in Date',
                    value: '2024-01-20',
                },
                {
                    label: 'Check-out Date',
                    value: '2024-01-25',
                },
                {
                    label: 'Total Fare',
                    value: '₹14,500',
                },
            ],
        },
    });
};
const bookings = async (req, res) => {
    try {
        const _bookings = await Booking.find({ userId: req.body.userId });
        console.log(req.body);
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
        console.log(bookings);
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
const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        console.log(bookingData);
        const newBooking = new Booking(bookingData);
        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};
module.exports = { checkoutInformation, bookings, paymentMethods, createBooking };
