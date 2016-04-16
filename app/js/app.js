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
  'issueTrackingSystem.version'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
  }])
  .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
