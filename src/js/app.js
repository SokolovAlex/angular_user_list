/**
 * Created by alexs_000 on 25.05.2016.
 */
define([
    'angular',
    'angular-route',
    './controllers',
    './directives'
], function (angular) {
    return angular.module('app', ['ngRoute', 'controllers', 'directives']);
});