'use strict';

angular.module('issueTrackingSystem.controllers.issue', [
    'issueTrackingSystem.services.issue',
    'issueTrackingSystem.services.auth',    
    'issueTrackingSystem.services.project'    
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id', {
            templateUrl: 'app/templates/issue.html',
            controller: 'IssueController'
        })
    }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        '$window',
        'IssueServices',
        'AuthServices',
        'ProjectServices',
        function IssueController($scope, $routeParams, $window, IssueServices, AuthServices, ProjectServices){
                IssueServices.GetIssueById($routeParams.id)
                    .then(function (success) {
                        $scope.Issue = success;
                        console.log(success);
                    });
                    
                    
                $scope.Redirect = function (location) {
                    $window.location.href = location;
                }
                
                IssueServices.GetCommentsByIssueId($routeParams.id)
                    .then(function (success) {
                        $scope.Comments = success;
                    }, function (error) {
                        console.log(error);
                    });
                
                AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
                }, function (error) {
                    $window.location.href = '/#/';
                });
                
                $scope.ChangeStatus = function (StatusId) {
                    IssueServices.ChangeStatus($routeParams.id, StatusId)
                }
                
                $scope.AddComment = function (Comment) {
                    var obj = {
                        Text: Comment
                    }
                    IssueServices.AddComment($routeParams.id, obj);                     
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

angular.module('issueTrackingSystem.controllers.addIssue', [
    'issueTrackingSystem.services.issue',
    'issueTrackingSystem.services.auth',    
    'issueTrackingSystem.services.project'    
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/project/:id/add-issue', {
            templateUrl: 'app/templates/addIssue.html',
            controller: 'AddIssueController'
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$window',
        'IssueServices',
        'AuthServices',
        'ProjectServices',
        function AddIssueController($scope, $routeParams, $window, IssueServices, AuthServices, ProjectServices) {
            $scope.Issue = {};
            ProjectServices.GetAllProjects()
                .then(function (success) {
                    $scope.Projects = success;
                });
                
            ProjectServices.GetProjectById($routeParams.id)
                .then(function (success) {
                    $scope.Issue.Project = success;
                    $scope.Issue.Labels = $scope.loopData($scope.Issue.Project.Labels);
                });
            
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.Issue.Assignee = success;
                    
                });
            
            AuthServices.GetAllUsers()
                .then(function (success) {
                    $scope.Users = success;
                });
                
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUserId = success.Id;
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
            
            $scope.Add = function (Issue) {
                var labels = "";
                labels = Issue.Labels;
                labels = labels.split(", ");
                
                 var newLabels= [];
                for (var index = 0; index < labels.length; index++) {
                        newLabels[index] = { Name: labels[index]};                     
                }
                
                var IssueForRequest = {
                    Title: Issue.Title,
                    Description: Issue.Description,
                    DueDate: Issue.DueDate,
                    ProjectId: Issue.Project.Id,
                    AssigneeId: Issue.Assignee.Id,
                    PriorityId: Issue.Priority.Id,
                    Labels: newLabels
                };  
                IssueServices.PostIssue(IssueForRequest);
            }
        }
    ]);
    
angular.module('issueTrackingSystem.controllers.editIssue', [
    'issueTrackingSystem.services.issue',
    'issueTrackingSystem.services.auth',    
    'issueTrackingSystem.services.project'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issue/:id/edit', {
            templateUrl: 'app/templates/editIssue.html',
            controller: 'EditIssueController'
        })
    }])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        '$window',
        'IssueServices',
        'AuthServices',
        'ProjectServices',
        function EditIssueController($scope, $routeParams, $window, IssueServices, AuthServices, ProjectServices){
            AuthServices.GetCurrentUser()
                .then(function (success) {
                    $scope.CurrentUser = success;
                }, function (error) {
                    $window.location.href = '/#/';
                });
            
            IssueServices.GetIssueById($routeParams.id)
                .then(function (success) {
                    $scope.Issue = success;
                    if(success.Author.Id == $scope.CurrentUser.Id || $scope.CurrentUser.isAdmin){
                      
                    }else{
                        $window.location.href = '/#/issue/' + $routeParams.id;
                    }
                        
                        $scope.Issue.LabelsAsString = $scope.loopData(success.Labels);    
                        ProjectServices.GetProjectById($scope.Issue.Project.Id)
                            .then(function (projectSuccess) {
                                $scope.Project = projectSuccess;            
                            });
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
                
            AuthServices.GetAllUsers()
                .then(function (success) {
                    $scope.Users = success;
                })
                
             $scope.Edit = function (Issue) {
                var labels = "";
                labels = Issue.LabelsAsString;
                labels = labels.split(", ");
                
                 var newLabels= [];
                for (var index = 0; index < labels.length; index++) {
                        newLabels[index] = { Name: labels[index]};                     
                }
                
                var IssueForRequest = {
                    Title: Issue.Title,
                    Description: Issue.Description,
                    DueDate: Issue.DueDate,
                    AssigneeId: Issue.Assignee.Id,
                    PriorityId: Issue.Priority.Id,     
                    Labels: []               
                };  
                
                for (var index = 0; index < newLabels.length; index++) {
                    IssueForRequest.Labels[index] = newLabels[index];
                    
                }
                
                IssueServices.EditIssue($routeParams.id, IssueForRequest)
                    .then(function (success) {
                        
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
    ]);