angular.module('ProjectApp').controller('LayoutCtrl', function($scope, $mdSidenav){
    $scope.toggleSidebar = function(){
    	$mdSidenav("navigationLeft").toggle();
    };
});