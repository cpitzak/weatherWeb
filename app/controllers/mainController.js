'use strict';

var weatherWebApp = angular.module('weatherWebApp', ['ngRoute', 'ngResource', 'chart.js']);

weatherWebApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/'
            });
    }]);

weatherWebApp.controller('MainController', ['$scope', '$resource', '$interval',
    function ($scope, $resource, $interval) {
        var roomWeatherFunc, outsideWeatherFunc, updateCharts;
        function convert24to12Hour(hour24) {
            var hour12 = ((hour24 + 11) % 12) + 1;
            var amPm = hour24 > 11 && hour24 !== 24 ? 'PM' : 'AM';
            return hour12 + ":00 " + amPm;
        }
        $scope.location = 'Palo Alto';
        $scope.currentRoomWeather = {};
        $scope.currentOutsideWeather = {};
        roomWeatherFunc = function() {
            $resource('/roomWeather').get({}, function(obj) {
                $scope.currentRoomWeather = obj;
            });
        };
        outsideWeatherFunc = function() {
            $resource('/weather').get({}, function(obj) {
                $scope.currentOutsideWeather = obj;
            });
        };
        updateCharts = function() {
            $resource('/weather/hourly', {}, {query: {method: 'get', isArray: true}}).query(function(obj) {
                $resource('/roomWeather/hourly', {}, {query: {method: 'get', isArray: true}}).query(function(obj2) {
                    var i, hourlyData = obj,
                        roomHourlyData = obj2,
                        roomTempDataPoints = [],
                        roomHumidityDataPoints = [],
                        outsideTempPoints = [],
                        outsideHumidityPoints = [],
                        roomWeather = {},
                        roomHourKey;
                    $scope.labels = [];
                    $scope.data = [];
                    $scope.humidityChartData = [];
                    for(i = 0; i < roomHourlyData.length; i++) {
                        roomHourKey = convert24to12Hour(roomHourlyData[i].hour);
                        roomWeather[roomHourKey] =  {};
                        roomWeather[roomHourKey].temp = roomHourlyData[i].temp;
                        roomWeather[roomHourKey].humidity = roomHourlyData[i].humidity;
                    }
                    // $scope.labels = ["5:00 AM", "6:00 AM", ...];
                    for(i = 0; i < hourlyData.length; i++) {
                        $scope.labels.push(hourlyData[i].time);
                        outsideTempPoints.push(hourlyData[i].temp);
                        outsideHumidityPoints.push(hourlyData[i].humidity);
                        if (roomWeather[hourlyData[i].time]) {
                            roomTempDataPoints.push(roomWeather[hourlyData[i].time].temp);
                            roomHumidityDataPoints.push(roomWeather[hourlyData[i].time].humidity);
                        } else {
                            roomTempDataPoints.push(null);
                            roomHumidityDataPoints.push(null);
                        }
                    }
                    // $scope.data = [[65, 59, 80, 81, 56, 55, 40]];
                    $scope.data.push(outsideTempPoints);
                    $scope.data.push(roomTempDataPoints);
                    $scope.humidityChartData.push(outsideHumidityPoints);
                    $scope.humidityChartData.push(roomHumidityDataPoints);
                    $scope.series = [$scope.location, 'Room'];
                    $scope.onClick = function (points, evt) {
                        console.log(points, evt);
                    };
                  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
                  $scope.options = {
                    legend: {
                        display: true
                    },
                    scales: {
                      yAxes: [
                        {
                          id: 'y-axis-1',
                          type: 'linear',
                          display: true,
                          position: 'right'
                        }
                      ]
                    }
                  };
                  $scope.tableData = [];
                  for (i = $scope.labels.length - 1; i >= 0; i--) {
                    $scope.tableData.push([$scope.labels[i], $scope.data[0][i], $scope.data[1][i],
                        $scope.humidityChartData[0][i], $scope.humidityChartData[1][i]]);
                  }
                });
            });
        };
        // on first load
        roomWeatherFunc();
        outsideWeatherFunc();
        updateCharts();
        // update current weather display every 5 seconds
        $interval(roomWeatherFunc, 5000);
        $interval(outsideWeatherFunc, 5000);
        // update outside weather data every 7 minutes.
        // we update our db from weather underground every 15 mins on the backend. This amount because of API call limits.
        // when loading this page if you come in at 1/2 through the intervals 15 min / 2 = 7.5 mins then 7.5 mins is the shortest
        // time till the next update.
        $interval(updateCharts, 7*60*1000);
    }]);
