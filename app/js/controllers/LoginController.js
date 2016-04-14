'use strict';

angular.module('issueTrackingSystem.controllers.login', [
    'issueTrackingSystem.services.auth'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'LoginController'
        })
    }])
    .controller('LoginController', [
        '$scope',
        'AuthServices',        
        function LoginController($scope, AuthServices) {
            $scope.login = function(User){
                User.grant_type = 'password';
                AuthServices.Login(User)
                    .then(function(success){                   
                    sessionStorage['CurrentUser'] = success.userName;
                    sessionStorage['AccessToken'] = success.access_token;
                    sessionStorage['TokenType'] = success.token_type;
                    })
            }
        }
    ]);