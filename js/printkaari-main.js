var app = angular.module('printkaariApp',["ngRoute"]);

app.controller('loginController',['$scope', '$http', '$window', '$routeParams','loginDataService',function($scope,$http,$window, $routeParams,loginDataService){

	$scope.loginBox = true;
	$scope.signupBoxStepOne = false;
	$scope.signupBoxStepTwo = false;
	$scope.resetPasswordBox = false;
	$scope.forgetPasswordBox = false;
	$scope.resetPasswordSuccessBox=false;

	$scope.doLogin = function(){

		  var loggedinUser;
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
			$scope.loggedinUser=response.data;
			loginDataService.setLoginData($scope.loggedinUser);
			if ($scope.loggedinUser.userType ==="CUSTOMER") {
				console.log(response.data.full_name);
                   $window.location.href = "customerDashBoard.html";
                } else {
                         $window.location.href = "index.html";
                       }
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);	
            $scope.errorCode = error.data.errorCode;			
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
				$scope.signupBoxStepOne=false;
				$scope.signupBoxStepTwo=true;
				
			console.log(response);
			console.log(step1Data.emailToken);
		};
		
		var onError = function(error){
			console.log(error);		
             $scope.error = error.status;			
		}
		$http.post('http://162.220.61.86:8080/printkaari-api/signup/initiate', data, _config).then(onSuccess, onError);
	
	}

	
	
	$scope.SignUpFinal = function(){

		var data = {
			"emailToken"	: $scope.emailToken,
			"contactNo"		: $scope.contactNo,
			"countryId"		: $scope.country.id,
			"stateId"		: $scope.state.id,
			"cityId"		: $scope.city.id,
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
			loginDataService.setLoginData($scope.User);
			emailToken='';
			if ($scope.User.userType === 'CUSTOMER') {
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
	
	$scope.getCountryList=function(){
		
		var onSuccess = function(response){
			$scope.countryList=response.data;
			console.log(response);
			console.log($routeParams);

			if($routeParams.tokenId !== undefined ){
				console.log("token Id is not undefined");
				$scope.loginBox = false;
				$scope.signupBoxStepTwo = true;
			}
			
			if($routeParams.tokenForPwd !== undefined ){
				console.log("tokenForPwd  is not undefined");
				$scope.emailToken=$routeParams.tokenForPwd;
				$scope.loginBox = false;
				$scope.resetPasswordBox = true;
			}
		};
		
		var onError = function(error){
			console.log(error);				
		};
		
		$http.get('http://162.220.61.86:8080/printkaari-api/location/countries').then(onSuccess, onError);
	}
	
		$scope.getStateListByCountryId = function(){
			console.log($scope.country);
		
		var data = {
			"countryId" : $scope.country.id
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
		
		$http.get('http://162.220.61.86:8080/printkaari-api/location/country/'+$scope.country.id+'/states').then(onSuccess, onError);
	}
	
	$scope.getCityListByStateId=function(){
		
		var data = {
			"stateId" : $scope.state.id
					
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
		
		$http.get('http://162.220.61.86:8080/printkaari-api/location/states/'+$scope.state.id+'/cities').then(onSuccess, onError);
	}
	
	//Forgot and Reset Password
	
	$scope.ForgotPassword=function(){
		
	      var data = {                        
                        "username": $scope.email                       
                    };

		    var _config = {
            headers: {'Content-Type' : 'application/json'
					 }
		 };
			var onSuccess = function(response){
			$scope.loggedinUser=response.data;
			$scope.forogtPasswordData=response.data;
				$scope.emailToken=$scope.forogtPasswordData.emailToken;
				$scope.forgetPasswordBox = false;
				$scope.resetPasswordBox=true;
				
			     console.log(response);
		};
		
		var onError = function(error){
			console.log(error);
             alert(error.message);			
		}
		
		$http.get('http://162.220.61.86:8080/printkaari-api/password/forgot?emailId='+$scope.email, data, _config).then(onSuccess, onError);
		
	}
	
	//Reset password
	$scope.ResetPassword = function(){
		var emailTokenId;
		if($scope.passwordToken !== undefined){
			emailTokenId=$scope.passwordToken;			
		}
		else{
			emailTokenId=$scope.emailToken ;
		}
	    var data = {                        
                        "newPassword": $scope.newPassword,
						"confirmPassword":$scope.confirmPwd,
						"emailToken":emailTokenId
                    };

	    var _config = {
                   headers: {'Content-Type' : 'application/json'}
		             };
					 
					 
		var onSuccess = function(response){
			    $scope.message=response.data;
				$scope.resetPasswordBox=false;				
				$scope.resetPasswordSuccessBox=true;
					
			     console.log(response);
		};
		
		var onError = function(error){
			alert(error.message);
			console.log(error);				
		}
		
		if(angular.equals($scope.newPassword, $scope.confirmPwd)){
			
			console.log(angular.equals($scope.newPassword, $scope.confirmPwd));
			$http.put('http://162.220.61.86:8080/printkaari-api/password/reset', data, _config).then(onSuccess, onError);
		}
		else{
			alert("New Password and Confirm Password are different");
		}
	}

}]);

app.controller('loginDataController',['$scope', '$http', '$window', '$routeParams','loginDataService',function($scope,$http,$window, $routeParams,loginDataService){
	
	
	$scope.loginData = loginDataService.getLoginData();
	
	            
	
	
}]);

app.service('loginDataService', function($window){
	
	var service = this;
	var loginData;
	
	service.setLoginData = function(data){
		$window.localStorage.loginData = JSON.stringify(data);			
	};
		
    service.getLoginData = function(){
		return JSON.parse($window.localStorage.loginData);
	};
		
});
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {templateUrl: 'partials/login.html',   controller: 'loginController'})
	.when('/emailtoken/:tokenId', {templateUrl: 'partials/login.html',   controller: 'loginController'})
	.when('/reset-password/:tokenForPwd' ,{templateUrl: 'partials/login.html',   controller: 'loginController'})
	.otherwise({redirectTo: '/'});

}]);