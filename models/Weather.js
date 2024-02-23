
const mongoose = require('mongoose');


const weatherSchema = new mongoose.Schema({
    location: String,
    temp: Number,
    disc: String,
    humidity: Number,
    feel: Number,
    Speed: Number,
    createdAt: { type: Date, default: Date.now }
});


const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;