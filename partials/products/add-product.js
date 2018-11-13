angular.module('ProjectApp').controller('AddProductCtrl', function($scope, $http, $mdDialog, modalInfo){
	$scope.states = [];
	$scope.product = {};

	function init(){
		$http.get("/api/categories/list").then(function(response){
			$scope.categories = response.data;
		});
		$http.get("/api/providers/list").then(function(response){
			$scope.providers = response.data;
		});
		if(modalInfo){
			$scope.product = modalInfo;
			$scope.isUpdating = true;
		}
	}

	$scope.add = function(){
		var date = new Date();
		if($scope.isUpdating){
			$http.put("/api/products", $scope.product).then(function(response){
				$mdDialog.hide();
			});
		}
		else{
			$http.post("/api/products", $scope.product).then(function(response){
				$mdDialog.hide();
			});
		}
	};

	$scope.close = function(){
		$mdDialog.cancel();
	};

	init();
});