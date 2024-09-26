const Hotels = require('../models/hotelsModel');
const Country = require('../models/countriesModel');
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
    const hotels = await Hotels.find();
    const hotelsData = hotels;
    const currentPage = req.body.currentPage;
    let hotelId = 71222;
    const result = hotelsData.find((hotel) => {
        return Number(hotel.hotelCode) === Number(hotelId);
    });
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
    res.status(200).send({
        errors: [],
        data: {
            elements: data,
        },
        metadata,
        paging,
    });
};
const hotelDetails = async (req, res) => {
    let hotelId = req.params.hotelId;
    const description = [
        'A serene stay awaits at our plush hotel, offering a blend of luxury and comfort with top-notch amenities.',
        'Experience the pinnacle of elegance in our beautifully designed rooms with stunning cityscape views.',
        'Indulge in gastronomic delights at our in-house restaurants, featuring local and international cuisines.',
        'Unwind in our state-of-the-art spa and wellness center, a perfect retreat for the senses.',
        'Located in the heart of the city, our hotel is the ideal base for both leisure and business travelers.',
    ];
    const hotels = await Hotels.find();
    const result = hotels.find((hotel) => {
        return Number(hotel.hotelCode) === Number(hotelId);
    });

    result.description = description;
    res.status(200).send({
        errors: [],
        data: result,
    });
};
const verticalFilters = async (req, res) => {
    res.status(200).json({
        errors: [],
        data: {
            elements: [
                {
                    filterId: 'star_ratings',
                    title: 'Star ratings',
                    filters: [
                        {
                            id: '5_star_rating',
                            title: '5 Star',
                            value: '5',
                        },
                        {
                            id: '4_star_rating',
                            title: '4 Star',
                            value: '4',
                        },
                        {
                            id: '3_star_rating',
                            title: '3 Star',
                            value: '3',
                        },
                    ],
                },
                {
                    filterId: 'propety_type',
                    title: 'Property type',
                    filters: [
                        {
                            id: 'prop_type_hotel',
                            title: 'Hotel',
                        },
                        {
                            id: 'prop_type_apartment',
                            title: 'Apartment',
                        },
                        {
                            id: 'prop_type_villa',
                            title: 'Villa',
                        },
                    ],
                },
            ],
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
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi thêm quốc gia' });
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
const enquiry = async (req, res) => {
    try {
        const _Hotels = await Hotels.find();
        let hotelId = req.params.hotelId;
        const result = _Hotels.find((hotel) => {
            return Number(hotel.hotelCode) === Number(hotelId);
        });
        res.status(200).send({
            errors: [],
            data: {
                name: result.title,
                cancellationPolicy: 'Free cancellation 1 day prior to stay',
                checkInTime: '12:00 PM',
                checkOutTime: '10:00 AM',
                currentNightRate: result.price,
                maxGuestsAllowed: 5,
                maxRoomsAllowedPerGuest: 3,
            },
        });
    } catch (err) {}
};
const addReviews = async (req, res) => {
    res.send('ok');
};
module.exports = { getHotels, verticalFilters, country, getCountry, hotelDetails, reviews, enquiry, addReviews };
