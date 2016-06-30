"use strict";

/* jshint node: true */

var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var WeatherObject = require('./schema/weatherObject.js');

var express = require('express');
var app = express();

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
        year = date.getFullYear();
    WeatherObject.find({"day": day, "year": year}, function (err, weatherList) {
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

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + staticFiles);
});
