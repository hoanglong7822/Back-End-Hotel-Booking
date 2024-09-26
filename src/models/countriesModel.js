const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true, // Đảm bảo code của mỗi quốc gia là duy nhất
    },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
