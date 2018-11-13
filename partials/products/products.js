angular.module('ProjectApp').controller('ProductsCtrl', function($scope, $http, $mdMenu, $rootScope, $mdDialog){
	var cleanEvent;
	
	function init(){
		$http.get("/api/products/list").then(function(data){
			var i;
			$scope.products = data.data;
		});
	}

	$scope.add = function(){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddProductCtrl",
			locals: {modalInfo: false},
			templateUrl: 'partials/products/add-product.html'
		}).then(init);
	};

	$scope.delete = function(product){
		$http.delete("/api/products", {params: {idProduct: product.idProduct}}).then(init);
	};

	$scope.edit = function(product){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: "AddProductCtrl",
			locals: {modalInfo: product},
			templateUrl: 'partials/products/add-product.html'
		}).then(init);
	};

	cleanEvent = $rootScope.$on('global:clickListen', $mdMenu.hide);

	$scope.$on("$destroy", cleanEvent);

	init();
});