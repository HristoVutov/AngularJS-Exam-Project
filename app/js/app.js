'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.controllers.home',
  'issueTrackingSystem.controllers.login',
  'issueTrackingSystem.controllers.register',  
  'issueTrackingSystem.controllers.project',
  'issueTrackingSystem.controllers.editProject',
  'issueTrackingSystem.controllers.dashboard',  
  'issueTrackingSystem.controllers.issue',
  'issueTrackingSystem.controllers.addIssue',
  'issueTrackingSystem.controllers.editIssue',
  'issueTrackingSystem.version'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
  }])
  .controller('BaseController', [
    '$scope',
    function ($scope) {
      $scope.loopData = function (Data) {
        var result = "";
          if(Data != undefined){
            Data.forEach(function(element) {
             result+= element.Name + ', ';
            }, this);
        }
      }
    }
  ])
  .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
