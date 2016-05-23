require.config({
    paths: {
        'domReady': '../lib/requirejs-domready/domReady',
        'angular': '/js/libs'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: ['./bootstrap']
});