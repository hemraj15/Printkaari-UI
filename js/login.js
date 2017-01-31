var app = angular.module('loginApp',[]);

app.controller('loginController',['$scope', '$http', '$window',function($scope,$http,$window){
	$scope.doLogin = function(){

		
		  var data = {
                        
                        "username": $scope.username,
                        "password": $scope.password
                    };

		var requestData = $scope.transformRequestForFormEncoded(data);
        var _config = {
            headers: {'Content-Type' : 'application/json'
					 }
		 };
			var onSuccess = function(response){
			$scope.User=response.data;
			$window.location.href = "index.html";
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		}
		
		$http.post('http://162.220.61.86:8080/printkaari-api/app/login', data, _config).then(onSuccess, onError);
		
	}


	$scope.SignUpIntiate = function(){
		var data = {
			"firstName" : $scope.firstName,
			"lastName"  : $scope.lastName,
			"email"     : $scope.email,
			"password"  : $scope.password,
			"userType"  : $scope.userType,
		}
		console.log(data);
		var requestData = $scope.transformRequestForFormEncoded(data);
        var _config = {
            headers: {
            	'Content-Type' : 'application/json',
			}
        };
			var onSuccess = function(response){
			$('#signupBoxStepOne').hide(); 
			$('#signupBoxStepTwo').show();
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		}
		$http.post('http://162.220.61.86:8080/printkaari-api/signup/initiate', data, _config).then(onSuccess, onError);


		
			
	}

	$scope.SignUpFinal = function(){

		var data = {
			"emailToken"	: $scope.emailToken,
			"contactNo"		: $scope.contactNo,
			"countryId"		: $scope.countryId,
			"stateId"		: $scope.stateId,
			"cityId"		: $scope.cityId,
			"zipCode"		: $scope.zipCode,
			"userType"		: $scope.userType,
			"houseNo"		: $scope.houseNo,
			"street"		: $scope.street,
			"landMark"		: $scope.landMark,
			"area"			: $scope.area
		}

		var requestData = $scope.transformRequestForFormEncoded(data);
        var _config = {
            headers: {
            	'Content-Type' : 'application/json'
			}
        };
		
		var onSuccess = function(response){
			$scope.User=response.data;
			$window.location.href = "index.html";
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		}
		$http.post('http://162.220.61.86:8080/printkaari-api/signup/complete', data, _config).then(onSuccess, onError);
			
		
					
	}
	
	
	$scope.transformRequestForFormEncoded = function(obj) {
			var str = [];
			for (var p in obj)
				str.push(encodeURIComponent( p ) + "=" + encodeURIComponent(obj[p]));
			return str.join("&");    
    }

}]);