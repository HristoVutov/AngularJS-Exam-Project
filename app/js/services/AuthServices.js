angular.module('issueTrackingSystem.services.auth', [])
    .factory('AuthServices', [
        '$http',
        '$q',
        function ($http, $q) {
            
            function Register(User) {
                var deferred = $q.defer();
                
                $http.post(
                    'http://softuni-issue-tracker.azurewebsites.net/api/Account/Register', 
                     User
                     )
                .then(function (result) {
                    deferred.resolve(result.data);
                },function (err) {
                    deferred.reject(err);
                })
                
                return deferred.promise;
            },
            
            function Login(User) {
                 var deferred = $q.defer();
                 
                 $http.post('http://softuni-issue-tracker.azurewebsites.net/api/Token', User)
                      .;
            }
            
            
            
            return {
                Register: Register
            }
        }
    ]);