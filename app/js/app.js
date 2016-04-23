'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.controllers.home', 
  'issueTrackingSystem.controllers.login',
  'issueTrackingSystem.controllers.logout',
  'issueTrackingSystem.controllers.register',  
  'issueTrackingSystem.controllers.project',
  'issueTrackingSystem.controllers.projects',
  'issueTrackingSystem.controllers.addProject',
  'issueTrackingSystem.controllers.editProject',
  'issueTrackingSystem.controllers.dashboard',  
  'issueTrackingSystem.controllers.issue',
  'issueTrackingSystem.controllers.addIssue',
  'issueTrackingSystem.controllers.editIssue',
  'issueTrackingSystem.controllers.profile',  
  'issueTrackingSystem.directive.auth',
  'issueTrackingSystem.version',
  'cgNotify'
])
  .config(['$routeProvider', function($routeProvider) {    
      $routeProvider.otherwise({redirectTo: '/'});           
  }])
  .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')  ;
  







