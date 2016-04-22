'use strict';

angular.module('issueTrackingSystem.directive.auth', [
    'issueTrackingSystem.services.auth'
])

.directive('hasUserLogged', [
    'AuthServices',
     function(AuthServices) {
      return function(scope, elm, attrs) {          
          AuthServices.GetCurrentUser()
            .then(function (success) {
                elm[0].innerHTML = '<a href="#/logout">Logout</a>';
            }, function (error) {
                elm[0].innerHTML = '';
            });      
  };
}]);