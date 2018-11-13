angular.module('ProjectApp').controller('AddProviderCtrl', function($scope, $http, $mdDialog, modalInfo){
	$scope.states = [];
	$scope.provider = {};

	function init(){
		$http.get("/api/providers").then(function(response){
			$scope.providers = response.data;
		});
	}

	$scope.add = function(){
		var date = new Date();
		if($scope.isUpdating){
			$scope.provider.dCreate = $scope.provider.dCreate.split("T")[0];
			$http.put("/api/providers", $scope.provider).then(function(response){
				$mdDialog.hide();
			});
		}
		else{
			$scope.provider.dCreate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			$http.post("/api/providers", $scope.provider).then(function(response){
				$mdDialog.hide();
			});
		}
	};

	$scope.close = function(){
		$mdDialog.close();
	};

	init();
});