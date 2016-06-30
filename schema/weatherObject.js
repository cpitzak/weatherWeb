"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Weather Object
 */
/* jshint node: true */

var mongoose = require('mongoose'),
    WeatherObject;

var weatherObjectSchema = new mongoose.Schema({
    date: String,
    time: String,
    month: String,
    day: Number,
    year: Number,
    temp: Number,
    humidity: Number
}, {
    collection: 'weather_channel'
});

WeatherObject = mongoose.model('WeatherObject', weatherObjectSchema);
module.exports = WeatherObject;
