define(['./app'], function (app) {
    return app.config(['$routeProvider', function($routeProvider) {
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
    }]);
});