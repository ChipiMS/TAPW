angular.module('ProjectApp').controller('AuthLayoutCtrl', function($scope, $cookies, $rootScope){
    $rootScope.username = undefined;
    $cookies.remove("session");
});