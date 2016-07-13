"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Weather Object
 */
/* jshint node: true */

var mongoose = require('mongoose'),
    CurrentRoomWeatherObject;

var currentRoomWeatherObjectSchema = new mongoose.Schema({
    temp: Number,
    humidity: Number
}, {
    collection: 'current_room_weather'
});

CurrentRoomWeatherObject = mongoose.model('CurrentRoomWeatherObject', currentRoomWeatherObjectSchema);
module.exports = CurrentRoomWeatherObject;
