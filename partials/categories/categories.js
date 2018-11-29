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
			templateUrl: 'partials/categories/add-category.html'
		}).then(init);
	};

	$scope.delete = function(category){
		$http.delete("/api/categories", {params: {idCategory: category.idCategory}}).then(init);
	};

	$scope.edit = function(category){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddCategoryCtrl",
			locals: {modalInfo: category},
			templateUrl: 'partials/categories/add-category.html'
		}).then(init);
	};

	cleanEvent = $rootScope.$on('global:clickListen', $mdMenu.hide);

	$scope.$on("$destroy", cleanEvent);

	init();
});