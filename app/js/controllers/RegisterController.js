'use strict';

angular.module('issueTrackingSystem.controllers.register', [
    'issueTrackingSystem.services.auth'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/register', {
            templateUrl: 'app/templates/register.html',
            controller: 'RegisterController'
        })
    }])
    .controller('RegisterController', [
        '$scope',
        'AuthServices',
        function RegisterController($scope, AuthServices) {
            $scope.register = function (user) {
                AuthServices.Register(user)
                .then(function (user) {
                });
            }
        }]
    );