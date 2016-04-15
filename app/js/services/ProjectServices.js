angular.module('issueTrackingSystem.services.project', [])
    .factory('ProjectServices', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            
            function GetAllProjects() {
                var deferred = $q.defer();
                
                $http.get(BASE_URL + 'Projects', 
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                
                return deferred.promise;
            }
            
            function GetProjectById(Id) {
                 var deferred = $q.defer();
                
                $http.get(BASE_URL + 'Projects/' + Id, 
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                
                return deferred.promise;
            }
            
         
            
            
            
            return {
                GetAllProjects: GetAllProjects,
                GetProjectById: GetProjectById
            }
        }
    ]);