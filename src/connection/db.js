const mongoose = require('mongoose');
require('dotenv').config();

async function connection() {
    mongoose
        .connect(process.env.MONGO_CONNECTION)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
}
module.exports = connection;
