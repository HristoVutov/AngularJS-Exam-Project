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
            
            function GetProjectByLeadId(LeadId) {                
                var deferred = $q.defer();
                
                $http.get(BASE_URL + 'projects?filter=Lead.Id="' + LeadId + '"&pageSize=50&pageNumber=1', 
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                
                return deferred.promise;
            }
            
            function GetIssuesByProjectId(Id) {
                 var deferred = $q.defer();
                
                $http.get(BASE_URL + 'Projects/' + Id + '/Issues', 
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                
                return deferred.promise;
            }
            
            function EditProjectById(Id, Data) {                
                var deferred = $q.defer();
                
                $http.put(BASE_URL + 'Projects/' + Id, Data,
                     { headers: {'Authorization': sessionStorage['TokenType'] + " " + sessionStorage['AccessToken']}})
                        .then(function (result) {
                            deferred.resolve(result.data);
                        },function (err) {
                            deferred.reject(err);
                        })
                
                return deferred.promise;
            }
            
             function CreateProject(Data) {
                var deferred = $q.defer();
                
                $http.post(BASE_URL + 'Projects', Data,
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
                GetProjectById: GetProjectById,
                GetIssuesByProjectId: GetIssuesByProjectId,
                EditProjectById: EditProjectById,
                GetProjectByLeadId: GetProjectByLeadId,
                CreateProject: CreateProject
            }
        }
    ]);