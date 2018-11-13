angular.module('ProjectApp').controller('AddClientCtrl', function($scope, $http, $mdDialog, modalInfo){
	$scope.states = [];
	$scope.client = {};

	function init(){
		$http.get("/api/countries").then(function(response){
			$scope.countries = response.data;
		});
		if(modalInfo){
			$scope.client = modalInfo;
			$scope.isUpdating = true;
			$scope.contryChange();
		}
	}

	$scope.add = function(){
		var date = new Date();
		if($scope.isUpdating){
			$scope.client.dCreate = $scope.client.dCreate.split("T")[0];
			$http.put("/api/clients", $scope.client).then(function(response){
				$mdDialog.hide();
			});
		}
		else{
			$scope.client.dCreate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			$http.post("/api/clients", $scope.client).then(function(response){
				$mdDialog.hide();
			});
		}
	};

	$scope.close = function(){
		$mdDialog.close();
	};

	$scope.contryChange = function(){
		$http.get("/api/states", {params: {idCountry: $scope.client.idCountry}}).then(function(response){
			$scope.states = response.data;
		});
	};

	init();
});