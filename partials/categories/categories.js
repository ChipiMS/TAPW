angular.module('ProjectApp').controller('CategoriesCtrl', function($scope, $http, $mdMenu, $rootScope, $mdDialog){
	var cleanEvent;
	
	function init(){
		$http.get("/api/categories/list").then(function(data){
			$scope.categories = data.data;
		});
	}

	$scope.add = function(){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddCategoryCtrl",
			locals: {modalInfo: false},
			templateUrl: 'partials/categories/add-provider.html'
		}).then(init);
	};

	$scope.delete = function(provider){
		$http.delete("/api/categories", {params: {idCategory: provider.idCategory}}).then(init);
	};

	$scope.edit = function(provider){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddProviderCtrl",
			locals: {modalInfo: provider},
			templateUrl: 'partials/categories/add-provider.html'
		}).then(init);
	};

	cleanEvent = $rootScope.$on('global:clickListen', $mdMenu.hide);

	$scope.$on("$destroy", cleanEvent);

	init();
});