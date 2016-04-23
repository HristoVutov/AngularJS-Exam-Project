'use strict';

angular.module('issueTrackingSystem.controllers.project', [
    'issueTrackingSystem.services.project',
    'issueTrackingSystem.services.auth'
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
        '$window',
        'ProjectServices',
        'AuthServices',
        function ProjectController($scope, $routeParams, $window, ProjectServices, AuthServices) {  
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                }, function (error) {
                    $window.location.href = '/#/';
                });
            
            ProjectServices.GetProjectById($routeParams.id)
                .then(function(success){
                    $scope.Project = success;
                });
            
            ProjectServices.GetIssuesByProjectId($routeParams.id)
                .then(function(success){
                   $scope.Issues = success;
                });
            
            $scope.Redirect = function (location) {
                $window.location.href = location;
            }
            
            $scope.loopData = function (Data) {
                var result = "";
                if(Data != undefined){
                    Data.forEach(function(element) {
                        result+= element.Name + ', ';
                    }, this);
                }
                result = result.substr(0, result.length-2);
                return result;
            }
        }]
    );
    
angular.module('issueTrackingSystem.controllers.editProject', [
    'issueTrackingSystem.services.project',
    'issueTrackingSystem.services.issue',
    'issueTrackingSystem.services.auth'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id/edit', {
            templateUrl: 'app/templates/editProject.html',
            controller: 'EditProjectController'
        })
    }])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        '$window',
        'ProjectServices',
        'IssueServices',
        'AuthServices',
        function EditProjectController($scope, $routeParams, $window, ProjectServices, IssueServices, AuthServices){
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUser = success;
                }, function (error) {
                    $window.location.href = '/#/';
                });
            
            AuthServices.GetAllUsers()
                .then(function (success) {
                    $scope.AllUsers = success;
                });
            
             ProjectServices.GetProjectById($routeParams.id)
                .then(function(success){
                    $scope.Project = success;
                    $scope.Priorities = $scope.loopData(success.Priorities);
                    $scope.Labels = $scope.loopData(success.Labels);
                    if(success.Lead.Id == $scope.CurrentUser.Id || $scope.CurrentUser.isAdmin){
                      
                    }else{
                        $window.location.href = '/#/project/' + $routeParams.id;
                    }
                });
                
             $scope.loopData = function (Data) {
                var result = "";
                if(Data != undefined){
                    Data.forEach(function(element) {
                        result+= element.Name + ', ';
                    }, this);
                }
                result = result.substr(0, result.length-2);
                return result;
            }
             
            
             
            $scope.Edit = function (Project, Labels, Priorities) {
                 var newProject = {};
                 var labels = "";
                 var priorities = "";
                 priorities = Priorities.split(", ");
                 labels = Labels.split(", ");
                 var newLabels = [];
                 for (var index = 0; index < labels.length; index++) {
                     newLabels[index] = { Name: labels[index]};                     
                 }
                 var newPriorities = [];
                 for (var index = 0; index < priorities.length; index++) {
                     newPriorities[index] = { Name: priorities[index]};                     
                 }
                 
                 newProject.LeadId = Project.Lead.Id;
                 newProject.Description = Project.Description;
                 newProject.Name = Project.Name;    
                 newProject.Priorities = newPriorities;
                 newProject.Labels = newLabels;
                 ProjectServices.EditProjectById($routeParams.id, newProject)
                    .then(function (params) {
                        
                    }, function (error) {
                        console.log(error);
                    });
             }
            
        }
    ])
    

angular.module('issueTrackingSystem.controllers.projects', [
    'issueTrackingSystem.services.project',
    'issueTrackingSystem.services.auth'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects', {
            templateUrl: 'app/templates/projects.html',
            controller: 'ProjectsController'
        })
    }])
    .controller('ProjectsController', [
        '$scope',
        '$location',
        'ProjectServices',
        'AuthServices',
        function ProjectsController($scope, $location, ProjectServices, AuthServices) {
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    if(!success.isAdmin){
                        $location.path('/dashboard');
                    }
                });
                
            ProjectServices.GetAllProjects()
                .then(function (success) {
                    $scope.Projects = success;
                });
                
            $scope.Redirect = function (redirectTo) {
                $location.path(redirectTo);
            }
        }
    ]);
    

angular.module('issueTrackingSystem.controllers.addProject', [
    'issueTrackingSystem.services.project',
    'issueTrackingSystem.services.auth',
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/templates/addProject.html',
            controller: 'CreateProjectController'
        })
    }])
    .controller('CreateProjectController', [
        '$scope',
        'ProjectServices',
        'AuthServices',
        'notify',
        function CreateProjectController($scope, ProjectServices, AuthServices, notify) {
            AuthServices.GetAllUsers()
                .then(function (success) {
                    $scope.AllUsers = success;
                }, function(error){
                    console.log(error);
                })
                
            $scope.CreateProject = function(Data, Lead){
                var priorities = "";
                priorities = Data.Priorities;
                priorities = priorities.split(", ");
                
                var newPriorities= [];
                for (var index = 0; index < priorities.length; index++) {
                        newPriorities[index] = { Name: priorities[index]};                     
                }
                
                Data.LeadId = Lead.Id;
                Data.Priorities = newPriorities;
                ProjectServices.CreateProject(Data)
                    .then(function (success) {
                        notify('Project created');
                    }, function (error) {
                        console.log(error);
                        notify(error.data.Message);
                    })
            }
        }
    ]);