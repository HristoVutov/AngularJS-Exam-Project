'use strict';

angular.module('issueTrackingSystem.directives.basic', [])
    .directive('loopData', function () {
            return {
                restrict: 'A',
                scope: {
                    dataForLoop: '='
                },
                controller: [
                    function (attrs) {
                        console.log(attrs);
                    }
                ]
            }
        }
    )
    
    