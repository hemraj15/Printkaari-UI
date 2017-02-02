var app = angular.module('printkaariApp',[]);

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

        var emailToken;
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
				$scope.step1Data=response.data;
				emailToken=$scope.step1Data.emailToken;
				$('#signupBoxStepOne').hide(); 
 -				$('#signupBoxStepTwo').show();
			// $window.location.href = "signupStep2.html";
			console.log(response);
			console.log(step1Data.emailToken);
		};
		
		var onError = function(error){
			console.log(error);				
		}
		$http.post('http://162.220.61.86:8080/printkaari-api/signup/initiate', data, _config).then(onSuccess, onError);
	
	}

	
	
	$scope.SignUpFinal = function(){

		var data = {
			"emailToken"	: emailToken,
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
			emailToken='';
			if (User.userType =='CUSTOMER') {
                   $window.location.href = "customerDashBoard.html";
                } else {
                         $window.location.href = "index.html";
                       }
			
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


app.controller('locationController',['$scope', '$http', '$window',function($scope,$http,$window){

$scope.getCountryList=function(){
		
		var onSuccess = function(response){
			$scope.countryList=response.data;
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		};
		
		$http.get('http://162.220.61.86:8080/printkaari-api/location/countries').then(onSuccess, onError);
	}
	
		$scope.getStateListByCountryId=function(){
		
		var data = {
			//"countryId" : $scope.countryId
			"countryId" : 1
			
		}
		console.log(data);
		
        var _config = {
            headers: {
            	'Content-Type' : 'application/json',
			}
        };
		var onSuccess = function(response){
			$scope.stateList=response.data;
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		}
		
		$http.post('http://162.220.61.86:8080/printkaari-api/location/country/'+$scope.countryId+'/states' ,data,_config).then(onSuccess, onError);
	}
	
	$scope.getCityListByStateId=function(){
		
		var data = {
			//"stateId" : $scope.stateId
			"stateId" : 1
			
		}
		console.log(data);
		
        var _config = {
            headers: {
            	'Content-Type' : 'application/json',
			}
        };
		var onSuccess = function(response){
			$scope.cityList=response.data;
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);				
		};
		
		$http.post('http://162.220.61.86:8080/printkaari-api/location/states/'+$scope.stateId+'/cities' ,data,_config).then(onSuccess, onError);
	}
}]);