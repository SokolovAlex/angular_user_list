define(['./app'], function (app) {
    return app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/welcome',{
                templateUrl: 'views/welcome_page.html',
                controller:'WelcomeCtrl'
            })
            .when('/users',{
                templateUrl: 'views/users-view.html',
                controller:'UsersCtrl'
            })
            .otherwise({
                redirectTo: '/welcome'
            });
    }]);
});