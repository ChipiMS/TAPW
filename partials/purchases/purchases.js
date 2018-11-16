angular.module('ProjectApp').controller('PurchasesCtrl', function($scope, $http){
	$http.get("/api/purchases").then(function(response){
		$scope.purchases = response.data;
	});

	$scope.toggle = function(cart){
		cart.expanded = !cart.expanded;
	};
});