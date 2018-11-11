angular.module('ProjectApp').controller('LoginCtrl', function($scope, $state, $http, $rootScope, $cookies){
	$scope.user = {};

	$scope.change = function(){
		$scope.loginForm.username.$setValidity("wrong", true);
	};

	$scope.login = function(){
		$http.post("/api/auth/login", $scope.user).then(function(response){
			if(response.data.user){
				$rootScope.username = response.data.user.username;
				$cookies.put('session', $rootScope.username);
				$state.go("webapp.dashboard");
			}
			else{
				$scope.loginForm.username.$setValidity("wrong", false);
			}
		}, function(){
			$scope.loginForm.username.$setValidity("wrong", false);
		});
	};
});