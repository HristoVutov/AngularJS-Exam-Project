'use strict';

angular.module('issueTrackingSystem.controllers.project', [
    'issueTrackingSystem.services.project'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project', {
            templateUrl: 'app/templates/project.html',
            controller: 'ProjectController'
        })
    }])
    .controller('ProjectController', [
        '$scope',
        'ProjectServices',
        function ProjectController($scope, ProjectServices) {
            $scope.main = 'PRojectPage';
            ProjectServices.GetAllProjects()
                .then(function(success){
                    $scope.Projects = success;
                    console.log(success);
            });
        }]
    );