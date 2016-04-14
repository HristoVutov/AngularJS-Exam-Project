'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'issueTrackingSystem.controllers.home',
  'issueTrackingSystem.controllers.login',
  'issueTrackingSystem.controllers.register',
  'issueTrackingSystem.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
