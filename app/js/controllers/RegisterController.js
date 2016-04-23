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
        '$location',
        'AuthServices',
        function RegisterController($scope, $location, AuthServices) {
            
                
            $scope.register = function (user) {
                AuthServices.Register(user)
                .then(function (user) {
                    sessionStorage['CurrentUser'] = success.userName;
                    sessionStorage['AccessToken'] = success.access_token;
                    sessionStorage['TokenType'] = success.token_type;
                    $location.path('/dashboard/1');
                    notify('You registerd in successfully.'); 
                }, function (error) {
                        notify(error.data.error_description);                    
                });
            }
        }]
    );