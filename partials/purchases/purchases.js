angular.module('ProjectApp').controller('PurchasesCtrl', function($scope, $http){
	$http.get("/api/purchases").then(function(response){
		$scope.purchases = response.data;
	});

	$http.get("/api/purchases/totals").then(function(response){
		console.log(response);
	});

	$scope.toggle = function(cart){
		cart.expanded = !cart.expanded;
	};
});