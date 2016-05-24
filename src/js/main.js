require.config({
    paths: {
        'angular': '/js/angular',
        'angular-route': '/js/angular-route',
        'lodash': '/js/lodash'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'lodash': {
            exports: '_'
        }
    },
    deps: ['./bootstrap']
});