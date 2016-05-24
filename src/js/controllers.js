define(['angular'], function (angular) {

    var controllers = angular.module('controllers', []);

    controllers.factory('menu', function () {
        var activePage = '';
        return {
            active: function (page) {
                activePage = page;
            },
            checkActive: function (toCheck) {
                return activePage === toCheck ? 'active' : '';
            }
        };
    });

    controllers.controller('WelcomeCtrl', ['$scope', 'menu',
        function ($scope, menu) {
            menu.active('welcome');
        }]);

    controllers.controller('UsersCtrl', ['$scope', '$http', 'menu',
        function ($scope, $http, menu) {
            menu.active('users');
        }]);

    controllers.controller('MenuCtrl', ['$scope', '$rootScope', 'menu',
        function ($scope, $rootScope, menu) {
            var ctrl = this;
            ctrl.menuClass = menu.checkActive;
        }]);

    return controllers;
});