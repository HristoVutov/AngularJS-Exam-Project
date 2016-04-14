'use strict';

angular.module('issueTrackingSystem.controllers.login', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'LoginController'
        })
    }])
    .controller('LoginController', [
        '$scope',
        function LoginController($scope) {
            $scope.Hi = "Hi";
        }
    ]);