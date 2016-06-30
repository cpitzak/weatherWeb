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
        $resource('/weather/hourly', {}, {query: {method: 'get', isArray: true}}).query(function(obj) {
            var hourlyData = obj,
                dataPoints = [];
            console.log(JSON.stringify(obj));
            $scope.labels = [];
            $scope.data = [];
            for(var i = 0; i < hourlyData.length; i++) {
                $scope.labels.push(hourlyData[i].time);
                dataPoints.push(hourlyData[i].temp);
            }
            $scope.data.push(dataPoints);
            // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
          $scope.series = ['Palo_Alto'];
          // $scope.data = [
          //   [65, 59, 80, 81, 56, 55, 40],
          //   [28, 48, 40, 19, 86, 27, 90]
          // ];
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

    }]);
