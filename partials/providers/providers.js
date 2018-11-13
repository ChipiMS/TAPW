angular.module('ProjectApp').controller('ProvidersCtrl', function($scope, $http, $mdMenu, $rootScope, $mdDialog){
	var cleanEvent;
	
	function init(){
		$http.get("/api/providers/list").then(function(data){
			$scope.providers = data.data;
		});
	}

	$scope.addProvider = function(){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddProviderCtrl",
			locals: {modalInfo: false},
			templateUrl: 'partials/providers/add-provider.html'
		}).then(init);
	};

	$scope.delete = function(provider){
		$http.delete("/api/providers", {params: {idProvider: provider.idProvider}}).then(init);
	};

	$scope.edit = function(provider){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddProviderCtrl",
			locals: {modalInfo: provider},
			templateUrl: 'partials/providers/add-provider.html'
		}).then(init);
	};

	cleanEvent = $rootScope.$on('global:clickListen', $mdMenu.hide);

	$scope.$on("$destroy", cleanEvent);

	init();
});