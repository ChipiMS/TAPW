angular.module('ProjectApp').controller('CountriesCtrl', function($scope, $http){
	$scope.model = {};
	function init(){
		$http.get("/api/countries/states").then(function(response){
			$scope.countries = response.data;
		});
	}

	$scope.countryChange = function(country){
		if(country.name){
			$http.put("/api/countries", country);
		}
	};

	$scope.createCountry = function(){
		if($scope.model.newCountry){
			$http.post("/api/countries", {name: $scope.model.newCountry}).then(function(){
				$scope.model.newCountry = undefined;
				init();
			});
		}
	};

	$scope.createState = function(country){
		if($scope.model.newState){
			$http.post("/api/states", {idCountry: country.idCountry, name: $scope.model.newState}).then(function(){
				country.creatingState = false;
				$scope.model.newState = undefined;
				init();
			});
		}
	};

	$scope.finishState = function(country){
		country.creatingState = false;
		$scope.model.newState = undefined;
	};

	$scope.startState = function(country){
		country.creatingState = true;
	};

	$scope.stateChange = function(state){
		if(state.name){
			$http.put("/api/states", state);
		}
	};

	$scope.toggleCountry = function(country){
		country.expanded = !country.expanded;
	};

	init();
});