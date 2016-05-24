(function(angular) {
    var app = angular.module('users',['ngRoute', 'controllers', 'directives']);

    app.config(function($routeProvider){
        $routeProvider
            .when('/welcome',{
                templateUrl: 'welcome_page.html',
                controller:'WelcomeCtrl'
            })
            .when('/users',{
                templateUrl: 'users-view.html',
                controller:'UsersCtrl'
            })
            .otherwise({
                redirectTo: 'welcome'
            });
    });

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['users']);
    });
})(angular);

