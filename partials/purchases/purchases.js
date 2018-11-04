angular.module('ProjectApp').controller('PurchasesCtrl', function($scope, $http){
    $http.get("/api/purchases").then(function(data){
    	console.log(data);
    });
});