require.config({
    paths: {
        'angular': ['/js/angular.js', '/js/angular-route.js']
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: ['./bootstrap']
});