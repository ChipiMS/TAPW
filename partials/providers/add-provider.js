angular.module('ProjectApp').controller('AddProviderCtrl', function($scope, $http, $mdDialog, modalInfo){
	$scope.provider = {};

	function init(){
		//console.log('llenado');
		if(modalInfo){
			//console.log(modalInfo);
			$scope.provider = modalInfo;
			$scope.isUpdating = true;
		}
	}

	$scope.add = function(){
		var date = new Date();
		/*if($scope.isUpdating){
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
		}*/
	};

	$scope.close = function(){
		$mdDialog.hide();
	};

	init();
});