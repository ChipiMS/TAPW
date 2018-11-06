angular.module('ProjectApp').controller('ClientsCtrl', function($scope, $http, $mdMenu, $rootScope, $mdDialog){
	var cleanEvent;
	$http.get("/api/clients").then(function(data){
		$scope.clients = data.data;
	});

	$scope.add = function(){
		$mdDialog.show({
			templateUrl: 'partials/clients/add-client.html',
			clickOutsideToClose: true
		})
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