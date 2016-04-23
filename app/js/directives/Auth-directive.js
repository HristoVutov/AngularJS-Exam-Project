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
}])
.directive('userIsAdmin', [
 'AuthServices',
     function(AuthServices) {
      return function(scope, elm, attrs) {          
          AuthServices.GetCurrentUser()
            .then(function (success) {
              if(success.isAdmin){
                  $(elm).append('<li role="presentation"><a href="#/projects">Projects</a></li>');
                  $(elm).append('<li role="presentation"><a href="#/projects/add">Add Project</a></li>');                  
              }        
            }, function (error) {
            });      
  };
}]);