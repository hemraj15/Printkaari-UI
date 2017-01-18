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

		var requestData = $scope.transformRequestForFormEncoded(data);
        var _config = {
            headers: {"content-type": "application/x-www-form-urlencoded",
			           "Access-Control-Allow-Origin": "*"
					 },
			transformRequest: requestData
        };
		
		$http.post('http://162.220.61.86:8080/printkaari-api/oauth/token', data, _config).then(onSuccess, onError);
			
			
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