'use strict';

var weatherWebApp = angular.module('weatherWebApp', ['ngRoute', 'ngResource', 'chart.js']);

weatherWebApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/'
            });
    }]);

weatherWebApp.controller('MainController', ['$scope', '$resource',
    function ($scope, $resource) {
        function convert24to12Hour(hour24) {
            var hour12 = ((hour24 + 11) % 12) + 1;
            var amPm = hour24 > 11 && hour24 !== 24 ? 'PM' : 'AM';
            return hour12 + ":00 " + amPm;
        }
        $scope.currentRoomWeather = {};
        $resource('/roomWeather').get({}, function(obj) {
            $scope.currentRoomWeather = obj;
        });
        $resource('/weather/hourly', {}, {query: {method: 'get', isArray: true}}).query(function(obj) {

            $resource('/roomWeather/hourly', {}, {query: {method: 'get', isArray: true}}).query(function(obj2) {
                var i, hourlyData = obj,
                    roomHourlyData = obj2,
                    roomDataPoints = [],
                    dataPoints = [],
                    roomWeather = {},
                    roomHourKey;
                $scope.labels = [];
                $scope.data = [];
                for(i = 0; i < roomHourlyData.length; i++) {
                    roomHourKey = convert24to12Hour(roomHourlyData[i].hour);
                    roomWeather[roomHourKey] =  {};
                    roomWeather[roomHourKey].temp = roomHourlyData[i].temp;
                    roomWeather[roomHourKey].humidity = roomHourlyData[i].humidity;
                }
                // $scope.labels = ["5:00 AM", "6:00 AM", ...];
                for(i = 0; i < hourlyData.length; i++) {
                    $scope.labels.push(hourlyData[i].time);
                    dataPoints.push(hourlyData[i].temp);
                    if (roomWeather[hourlyData[i].time]) {
                        roomDataPoints.push(roomWeather[hourlyData[i].time].temp);
                    } else {
                        roomDataPoints.push(null);
                    }
                }
                // $scope.data = [[65, 59, 80, 81, 56, 55, 40]];
                $scope.data.push(dataPoints);
                $scope.data.push(roomDataPoints);
                $scope.series = ['Palo Alto', 'Room'];
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
              $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
              $scope.options = {
                scales: {
                  yAxes: [
                    {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'left'
                    }
                  ]
                }
              };

            });

            
        });

    }]);
