'use strict';

angular.module('issueTrackingSystem.controllers.register', [
    'issueTrackingSystem.services.auth'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'app/templates/loginRegister.html',
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