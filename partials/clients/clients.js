angular.module('ProjectApp').controller('ClientsCtrl', function($scope, $http, $mdMenu, $rootScope){
    var cleanEvent;
    $http.get("/api/clients").then(function(data){
    	$scope.clients = data.data;
    	console.log(data);
    });

    $scope.add = function(){
    	console.log("Adding");
    };

    $scope.delete = function(client){
    	console.log(client);
    };

    $scope.edit = function(client){
    	console.log(client);
    };

    cleanEvent = $rootScope.$on('global:clickListen', $mdMenu.hide);

    $scope.$on("$destroy", cleanEvent);
});