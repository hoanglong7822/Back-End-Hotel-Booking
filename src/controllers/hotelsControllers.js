const Hotels = require('../models/hotelsModel');
const Booking = require('../models/bookingsModel');
const Country = require('../models/countriesModel');
const FilterGroup = require('../models/filterGroupModel');

const getHotels = async (req, res) => {
    const hotels = await Hotels.find();
    const hotelsData = hotels;
    let { currentPage, filters, advancedFilters } = req.body;
    const { city, star_ratings } = filters;
    const sortByFilter = advancedFilters.find((filter) => {
        return filter.sortBy;
    });
    const filteredResults = hotelsData.filter((hotel) => {
        const hotelRating = hotel.ratings;
        const isCityMatch = city === '' || hotel.city === city;
        if (isCityMatch) {
            if (star_ratings && star_ratings.length > 0) {
                return star_ratings.some((selectedRating) => {
                    const range = 0.5;
                    return Math.abs(hotelRating - selectedRating) <= range;
                });
            } else {
                return true;
            }
        }
        return false;
    });
    if (sortByFilter) {
        const sortType = sortByFilter.sortBy;
        if (sortType === 'priceLowToHigh') {
            filteredResults.sort((a, b) => {
                return a.price - b.price;
            });
        }
        if (sortType === 'priceHighToLow') {
            filteredResults.sort((a, b) => {
                return b.price - a.price;
            });
        }
    }

    // pagination config
    const pageSize = 6;
    const totalPages = Math.floor((filteredResults.length - 1) / pageSize) + 1;
    currentPage = currentPage > totalPages ? totalPages : currentPage;
    const paging = {
        currentPage: currentPage || 1,
        totalPages: totalPages,
        pageSize: pageSize,
    };
    res.status(200).send({
        data: {
            elements: filteredResults.slice((paging.currentPage - 1) * pageSize, paging.currentPage * pageSize),
        },
        metadata: {
            totalResults: filteredResults.length,
        },
        paging,
    });
};
const reviews = async (req, res) => {
    const result = await Hotels.findOne({
        _id: req.body.hotelId,
    });
    const currentPage = req.body.currentPage;
    const totalRatings = result.reviews.data.reduce((acc, review) => acc + review.rating, 0);
    const initialCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const starCounts = result.reviews.data.reduce((acc, review) => {
        const ratingKey = Math.floor(review.rating).toString();
        if (acc.hasOwnProperty(ratingKey)) {
            acc[ratingKey]++;
        }
        return acc;
    }, initialCounts);

    const metadata = {
        totalReviews: result.reviews.data.length,
        averageRating: (totalRatings / result.reviews.data.length).toFixed(1),
        starCounts,
    };

    //paging
    const pageSize = 5;
    const paging = {
        currentPage: currentPage || 1,
        totalPages: Math.floor((result.reviews.data.length - 1) / pageSize) + 1,
        pageSize,
    };

    // paginated data
    const data = result.reviews.data.slice((paging.currentPage - 1) * pageSize, paging.currentPage * pageSize);
    res.status(200).send({ data, metadata, paging });
};
const hotelDetails = async (req, res) => {
    try {
        const hotelResult = await Hotels.findOne({
            hotelCode: req.params.hotelId,
        });
        res.status(200).json({ data: hotelResult });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
const verticalFilters = async (req, res) => {
    const filterResults = await FilterGroup.find();
    console.log(filterResults);
    res.status(200).json({
        errors: [],
        data: {
            elements: filterResults,
        },
    });
};
const country = async (req, res) => {
    try {
        const { name, code } = req.body;
        const newCountry = new Country({ name, code });
        await newCountry.save();
        res.json(newCountry);
    } catch (err) {
        res.status(500).json({ message: 'Err' });
    }
};
const getCountry = async (req, res) => {
    try {
        const _Country = await Hotels.find();
        res.status(200).send({
            errors: [],
            data: {
                elements: _Country,
            },
        });
    } catch (err) {}
};
/////////////thiếu hotel code
const enquiry = async (req, res) => {
    try {
        ///
        console.log(req.body);
        const { start_date, end_date, roomId } = req.body;
        const hotel = await Hotels.findOne({
            hotelCode: 71222,
        });
        const roomTypes = hotel.roomTypes;
        const room = roomTypes.find((room) => {
            return room.roomId === roomId;
        });
        const bookings = await Booking.find({
            roomId: roomId,
        });
        const dateObj = new Date(start_date);
        const convertedStartDate = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
        const startDate = new Date(convertedStartDate);
        const endDateObj = new Date(end_date);
        const convertedEndDate =
            endDateObj.getFullYear() + '-' + (endDateObj.getMonth() + 1) + '-' + endDateObj.getDate();
        const endDate = new Date(convertedEndDate);
        let totalRooms = 0;
        bookings.forEach((booking) => {
            const checkInDate = new Date(booking.checkIn.split('-').reverse().join('-'));
            const checkOutDate = new Date(booking.checkOut.split('-').reverse().join('-'));
            if (endDate <= checkInDate || startDate >= checkOutDate) {
                totalRooms = totalRooms + 1;
            }
        });
        const maxRoomsAllowedPerGuest = room.quantity - bookings.length - totalRooms;
        console.log(hotel);
        res.status(200).send({
            name: hotel.title,
            cancellationPolicy: 'Free cancellation 1 day prior to stay',
            checkInTime: '12:00 PM',
            checkOutTime: '10:00 AM',
            currentNightRate: room.price,
            maxGuestsAllowed: 5,
            maxRoomsAllowedPerGuest: maxRoomsAllowedPerGuest,
        });
    } catch (err) {
        res.status(400).json(err);
    }
};
const addReviews = async (req, res) => {
    try {
        const hotel = await Hotels.findOne({
            _id: req.body.hotelId,
        });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const newReview = req.body;

        // Validation to check for required fields
        if (!newReview.reviewerName || !newReview.rating || !newReview.review || !newReview.date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Add the new review to the hotel's reviews
        hotel.reviews.data.push({
            reviewerName: newReview.reviewerName,
            rating: newReview.rating,
            review: newReview.review,
            date: newReview.date,
            verified: newReview.verified || false, // Set verified to false if not provided
        });

        await hotel.save();

        res.status(200).send({ status: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};
const reservationRequest = async (req, res) => {
    try {
        const { start_date, end_date, roomId } = req.body;
        const hotel = await Hotels.findOne({
            hotelCode: 71222,
        });
        const roomTypes = hotel.roomTypes;
        const room = roomTypes.find((room) => {
            return room.roomId === roomId;
        });
        const bookings = await Booking.find({
            roomId: roomId,
        });
        //////////////////
        const dateObj = new Date(start_date);
        const convertedStartDate = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
        const startDate = new Date(convertedStartDate);
        console.log(startDate);
        const endDateObj = new Date(end_date);
        const convertedEndDate =
            endDateObj.getFullYear() + '-' + (endDateObj.getMonth() + 1) + '-' + endDateObj.getDate();
        const endDate = new Date(convertedEndDate);
        console.log(endDate);
        ///////////////////

        let totalRooms = 0;
        bookings.forEach((booking) => {
            const checkInDate = new Date(booking.checkIn.split('-').reverse().join('-'));
            const checkOutDate = new Date(booking.checkOut.split('-').reverse().join('-'));
            if (endDate <= checkInDate || startDate >= checkOutDate) {
                totalRooms = totalRooms + 1;
            }
        });
        console.log('Số phòng đã đặt là', bookings.length - totalRooms);
        console.log('Số phòng trống là', room.quantity - bookings.length - totalRooms);

        res.json('OK');
    } catch (err) {
        res.json('lỗi').status(404);
    }
};
module.exports = {
    getHotels,
    verticalFilters,
    country,
    getCountry,
    hotelDetails,
    reviews,
    enquiry,
    addReviews,
    reservationRequest,
};
