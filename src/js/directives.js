define(['angular', 'lodash'], function (angular, _) {
    var directives = angular.module('directives', []);

    directives.factory('userService', [ '$http', function($http) {
        var activeType;

        return {
            getData: function(){
                return $http.get('/mock_data.json');
            },
            active: function(type){
                activeType = type;
            },
            isActive: function(toCheck) {
                return activeType === toCheck ? 'active' : '';
            },
            getTemplate: function() {
                switch(activeType) {
                    case 'list':
                        return 'views/templates/user_list.html';
                    case 'block':
                        return 'views/templates/user_block.html';
                    default:
                        return 'views/templates/user_trello.html';
                }
            }
        };
    }]);

    directives.directive('typeSwitcher', function() {
        return {
            restrict: 'E',
            scope: {
                type: '@'
            },
            templateUrl: 'views/templates/type_switcher.html',
            controller: ['$scope', 'userService',  function($scope, userService) {
                $scope.isActive = userService.isActive;
                $scope.select = userService.active;
                userService.active($scope.type);
            }]
        };
    });

    directives.directive('userView', function() {
        return {
            restrict: 'E',
            template: '<div ng-include="getTemplateUrl()"/>',
            controller: ['$scope', 'userService', function($scope, userService) {
                $scope.getTemplateUrl = userService.getTemplate;

                userService
                    .getData()
                    .then(function(response) {
                        if (response.status == 200) {
                            $scope.users = response.data;
                            $scope.groups = _.groupBy(response.data, 'group');
                        }
                    });
            }]
        };
    });

    return directives;
});