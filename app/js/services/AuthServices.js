angular.module('issueTrackingSystem.services.auth', [])
    .factory('AuthServices', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            
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
            }
            
            function Login(User) {
                 var deferred = $q.defer();
                 
                 $http.post(BASE_URL + 'api/Token', "Username=" + encodeURIComponent(User.Username) +
                     "&password=" + encodeURIComponent(User.Password) +
                     "&grant_type=password",
                  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                      .then(function(success){
                          deferred.resolve(success.data);
                      },function (err){
                          deferred.reject(err);
                      });
                      
                 return deferred.promise;     
            }
            
            function GetCurrentUser() {
                 var deferred = $q.defer();                
                     
                $http.get(BASE_URL + 'Users/me', 
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                 return deferred.promise;     
            }
            
            function GetAllUsers() {
                 var deferred = $q.defer();                
                     
                $http.get(BASE_URL + 'Users', 
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                 return deferred.promise;     
            }
            
            function ChangePassword(User) {
                
                 var deferred = $q.defer();                
                     
                $http.post(BASE_URL + 'api/Account/ChangePassword', User ,
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                        
                 return deferred.promise;     
            }
            
            
            
            return {
                Register: Register,
                Login: Login,
                GetCurrentUser: GetCurrentUser,
                GetAllUsers: GetAllUsers,
                ChangePassword: ChangePassword
            }
        }
    ]);