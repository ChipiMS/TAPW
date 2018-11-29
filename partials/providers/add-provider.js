angular.module('ProjectApp').controller('AddProviderCtrl', function($scope, $http, $mdDialog, modalInfo){
	$scope.provider = {};

	function init(){
		if(modalInfo){
			$scope.provider = modalInfo;
			$scope.isUpdating = true;
		}
	}

	$scope.add = function(){
		var date = new Date();
		if($scope.isUpdating){
			$http.put("/api/providers", $scope.provider).then(function(response){
				$mdDialog.hide();
			});
		}
		else{
			$http.post("/api/providers", $scope.provider).then(function(response){
				$mdDialog.hide();
			});
		}
	};

	$scope.close = function(){
		$mdDialog.hide();
	};

	init();
});