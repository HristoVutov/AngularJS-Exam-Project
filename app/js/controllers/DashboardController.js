'use strict';

angular.module('issueTrackingSystem.controllers.dashboard', [
    'issueTrackingSystem.services.project',
    'issueTrackingSystem.services.issue',
    'issueTrackingSystem.filters.project',
    'issueTrackingSystem.services.auth', 
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/dashboard/:id', {
            templateUrl: 'app/templates/dashboard.html',
            controller: 'DashboardController'
        })
    }])
    .controller('DashboardController', [
        '$scope',
        '$routeParams',
        'ProjectServices',
        'IssueServices',
        'AuthServices',
        function DashboardController($scope, $routeParams, ProjectServices, IssueServices, AuthServices) {
            var projectIdArray = [];
            var projects = [];
            $scope.Projects = [];
            var currentUser = {};
            
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    currentUser = success;
                })
            
            ProjectServices.GetProjectByLeadId(currentUser.Id)
                .then(function (success) {
                    $scope.Projects.push(success);
                });
            
           
            
            IssueServices.GetMyIssues($routeParams.id)
                .then(function(success){
                    $scope.Issues = success;
                   success.Issues.forEach(function(element) {
                       if (projectIdArray.indexOf(element.Project.Id) < 0) {
                            projectIdArray.push(element.Project.Id);
                            ProjectServices.GetProjectById(element.Project.Id)
                                .then(function (project) {
                                    $scope.Projects.push(project);
                                });
                        }
                   }, this);
                });
                
            
                
               
                
            $scope.range = function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                    return input;
                };    
        }
    ]);