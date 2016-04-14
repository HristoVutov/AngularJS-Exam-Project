'use strict';

angular.module('issueTrackingSystem.services.home', [])
    .factory('HomeServices', [
        '$http',
        '$q',
        function ($http, $q) {
            
            function GetProjects() {
                var deferrde = $q.defer();
                
                $http.get()
            }
            
        }
    ]);