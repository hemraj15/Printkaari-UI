var app = angular.module('loginApp',[]);

app.controller('loginController',['$scope', '$http',function($scope,$http){
	$scope.doLogin = function(){

		
		var data = {
			"username": $scope.username,
			"password": $scope.password			
		};

		var requestData = $scope.transformRequestForFormEncoded(data);
        var _config = {
            headers: {"content-type": "application/json",
			           "Access-Control-Allow-Origin": "*"
					 },
			transformRequest: requestData
        };
		
		$http.post('http://localhost:8080/printkaari-api/app/login', data, _config).then(onSuccess, onError);
			
			
	}
	
	var onSuccess = function(response){
			console.log(response);
		};
		var onError = function(error){
			console.log(error);				
		}
	
	$scope.transformRequestForFormEncoded = function(obj) {
			var str = [];
			for (var p in obj)
				str.push(encodeURIComponent( p ) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");    
        }
}]);