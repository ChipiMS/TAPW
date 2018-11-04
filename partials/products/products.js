angular.module('ProjectApp').controller('ProductsCtrl', function($scope, $http){
    $http.get("/api/purchases").then(function(data){
    	console.log(data);
    });
});