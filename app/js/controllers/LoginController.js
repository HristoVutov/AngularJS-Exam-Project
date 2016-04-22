'use strict';

angular.module('issueTrackingSystem.controllers.login', [
    'issueTrackingSystem.services.auth'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'app/templates/loginRegister.html',
            controller: 'LoginController'
        })
    }])
    .controller('LoginController', [
        '$scope',
        'AuthServices', 
        'notify',     
        '$location',  
        function LoginController($scope, AuthServices, notify, $location) {
            $scope.login = function(User){
                User.grant_type = 'password';
                AuthServices.Login(User)
                    .then(function(success){                   
                        sessionStorage['CurrentUser'] = success.userName;
                        sessionStorage['AccessToken'] = success.access_token;
                        sessionStorage['TokenType'] = success.token_type;
                        notify('You logged in successfully.'); 
                         $location.path('/dashboard/1');
                    }, function (error) {
                        notify(error.data.error_description);
                    })
            }
        }
    ]);