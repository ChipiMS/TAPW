angular.module('ProjectApp').controller('AddCategoryCtrl', function($scope, $http, $mdDialog, modalInfo){
	$scope.category = {};

	function init(){
		if(modalInfo){
			$scope.category = modalInfo;
			$scope.isUpdating = true;
		}
	}

	$scope.add = function(){
		var date = new Date();
		if($scope.isUpdating){
			$http.put("/api/categories", $scope.category).then(function(response){
				$mdDialog.hide();
			});
		}
		else{
			$http.post("/api/categories", $scope.category).then(function(response){
				$mdDialog.hide();
			});
		}
	};

	$scope.close = function(){
		$mdDialog.hide();
	};

	init();
});