'use strict';

angular.module('issueTrackingSystem.controllers.project', [
    'issueTrackingSystem.services.project'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id', {
            templateUrl: 'app/templates/project.html',
            controller: 'ProjectController'
        })
    }])
    .controller('ProjectController', [
        '$scope',
        '$routeParams',
        'ProjectServices',
        function ProjectController($scope, $routeParams, ProjectServices) {
            $scope.main = 'PRojectPage';
            ProjectServices.GetProjectById($routeParams.id)
                .then(function(success){
                    $scope.Project = success;
            });
            
            ProjectServices.GetIssuesByProjectId($routeParams.id)
                .then(function(success){
                   $scope.Issues = success;
                });
            
            $scope.loopLabels = function (Labels) {
                var result = "";
                Labels.forEach(function(element) {
                    result += element.Name + " ,";
                }, this);
                return result;
            }
        }]
    );