"use strict";

/* jshint node: true */

var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var WeatherObject = require('./schema/weatherObject.js');
var RoomWeatherObject = require('./schema/roomWeatherObject.js');

var express = require('express');
var app = express();

var months = [];
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var staticFiles = path.join(__dirname, "app");
mongoose.connect('mongodb://localhost/weatherdb');

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(staticFiles));

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + staticFiles);
});

app.get('/weather', function (request, response) {
    WeatherObject.find({}, function (err, weatherList) {
        var resultList;
        if (err) {
            console.error('Doing /weather error:', err);
            response.status(500).send('Doing /weather error:');
            return;
        }
        if (weatherList.length !== 0) {
            resultList = JSON.parse(JSON.stringify(weatherList));
            for(var i = 0; i < resultList.length; i++) {
                delete resultList[i].date;
            }
        } else {
            resultList = weatherList;
        }
        response.status(200).end(JSON.stringify(resultList));
    });
});

// get todays weather
app.get('/weather/hourly', function(request, response) {
    var date = new Date(),
        day = date.getDate(),
        month = months[date.getMonth()],
        year = date.getFullYear();
    WeatherObject.find({"day": 1, "month": month, "year": year}, function (err, weatherList) {
        var resultList;
        if (err) {
            console.error('Doing /weather/hourly error:', err);
            response.status(500).send('Doing /weather/hourly error:');
            return;
        }
        if (weatherList.length !== 0) {
            resultList = JSON.parse(JSON.stringify(weatherList));
            for(var i = 0; i < resultList.length; i++) {
                delete resultList[i].date;
            }
        } else {
            resultList = weatherList;
        }
        response.status(200).end(JSON.stringify(resultList));
    });
});

app.get('/roomWeather/hourly', function(request, response) {
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    RoomWeatherObject.find({"day": day, "month": month, "year": year}, function (err, weatherList) {
        var resultList;
        if (err) {
            console.error('Doing /roomWeather/hourly error:', err);
            response.status(500).send('Doing /roomWeather/hourly error:');
            return;
        }
        if (weatherList.length !== 0) {
            resultList = JSON.parse(JSON.stringify(weatherList));
            for(var i = 0; i < resultList.length; i++) {
                delete resultList[i].date;
            }
        } else {
            resultList = weatherList;
        }
        response.status(200).end(JSON.stringify(resultList));
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + staticFiles);
});
