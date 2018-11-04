angular.module('ProjectApp').controller('ClientsCtrl', function($scope, $http){
    $http.get("/api/purchases").then(function(data){
    	console.log(data);
    });
});