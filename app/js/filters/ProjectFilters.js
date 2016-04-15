'use strict';

angular.module('issueTrackingSystem.filters.project', [])
    .filter('ProjectFilterByUser', function() {
        return function(input) {
          console.log(input);
          return input;
    };
});
