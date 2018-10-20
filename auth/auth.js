angular.module('ProjectAuth', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngMessages']);
angular.module('ProjectAuth').config(function($stateProvider) {
    $stateProvider.state('auth', {
        abstract: true,
        url: '/',
        templateUrl: 'auth/partials/layout/layout.html'
    });
    $stateProvider.state('auth.auth', {
        url: '',
        templateUrl: 'auth/partials/login/login.html'
    });
});