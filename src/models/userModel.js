const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        computed: true, // Flag as computed property (optional)
    },
    phone: String,
    country: String,
    isPhoneVerified: Boolean,
    isEmailVerified: Boolean,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
