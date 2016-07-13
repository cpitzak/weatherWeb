"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Weather Object
 */
/* jshint node: true */

var mongoose = require('mongoose'),
    RoomWeatherObject;

var roomWeatherObjectSchema = new mongoose.Schema({
    date_hour: String,
    hour: Number,
    month: Number,
    day: Number,
    year: Number,
    temp: Number,
    humidity: Number
}, {
    collection: 'room_weather'
});

RoomWeatherObject = mongoose.model('RoomWeatherObject', roomWeatherObjectSchema);
module.exports = RoomWeatherObject;
