angular.module('ProjectApp').controller('ClientsCtrl', function($scope, $http, $mdMenu, $rootScope, $mdDialog, $timeout){
	var cleanEvent;
	
	function init(){
		$http.get("/api/clients/list").then(function(data){
			var i;
			$scope.clients = data.data;
		});
	}

	$scope.add = function(){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddClientCtrl",
			locals: {modalInfo: false},
			templateUrl: 'partials/clients/add-client.html'
		}).then(init);
	};

	$scope.delete = function(client){
		$http.delete("/api/clients", {params: {username: client.username}}).then(init);
	};

	$scope.edit = function(client){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddClientCtrl",
			locals: {modalInfo: client},
			templateUrl: 'partials/clients/add-client.html'
		}).then(init);
	};

	$scope.show = function(client){
		$scope.selectedClient = false;
		$timeout(function(){
			$scope.selectedClient = client.username;
		});
	};

	cleanEvent = $rootScope.$on('global:clickListen', $mdMenu.hide);

	$scope.$on("$destroy", cleanEvent);

	init();
});