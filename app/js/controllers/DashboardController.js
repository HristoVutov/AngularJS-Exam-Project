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
        '$location',
        'ProjectServices',
        'IssueServices',
        'AuthServices',
        function DashboardController($scope, $routeParams, $location, ProjectServices, IssueServices, AuthServices) {
            var projectIdArray = [];
            var projects = [];
            $scope.Projects = [];
            var currentUser = {};
            
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.currentUser = success;
                   ProjectServices.GetProjectByLeadId($scope.currentUser.Id)
                    .then(function (projectSuccess) {
                        projectSuccess.Projects.forEach(function(element) {
                            if (projectIdArray.indexOf(element.Id) < 0) {
                                projectIdArray.push(element.Id);
                                $scope.Projects.push(element);
                            }
                        }, this);
                        $scope.Projects.push(projectSuccess.Projects);
                    }, function (error) {
                        
                    });
                }, function (error) {         
                         $location.path('/');
                })
            
            
            
           
            
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