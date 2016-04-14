'use strict';

angular.module('issueTrackingSystem.controllers.home', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/home', {
            templateUrl: 'app/templates/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        function HomeController($scope) {
            $scope.Hi = "Hi";
        }
    ]);