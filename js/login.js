var app = angular.module('loginApp',[]);

app.controller('loginController',['$scope', '$http',function($scope,$http){
	$scope.doLogin = function(){

		
		var data = {
			"grant_type":"password",
			"client_id":"printkaari_app",
			"client_secret":"printkaari_app_s3cr3t",
			"username": $scope.username,
			"password": $scope.password,
			"scope":"read,write,trust"
		};

		var req = {
			method: 'POST',
			url: 'http://162.220.61.86:8080/printkaari-api/oauth/token',
			headers: {
			'Content-Type' : 'application/json'
			},
			data: data
		};
		
		$http(req)
			.then(function successCallback(response){
				console.log("response");
				console.log(response);
			}, function errorCallback(err){
				console.log(err);
			});
	}
}]);