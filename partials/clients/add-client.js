angular.module('ProjectApp').controller('AddClientCtrl', function($scope, $http, $mdDialog){
	function init(){
		$http.get("/api/countries").then(function(response){
			$scope.countries = response.data;
		});
	}


	$scope.add = function(){
		$mdDialog.hide();
	};

	$scope.close = function(){
		$mdDialog.hide();
	};

	init();
});