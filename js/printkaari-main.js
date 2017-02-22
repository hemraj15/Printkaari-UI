var app = angular.module('printkaariApp',["ngRoute"]);

app.controller('loginController',['$scope', '$http', '$window', '$route','$routeParams','loginDataService','$location',function($scope,$http,$window, $route,$routeParams,loginDataService,$location){
    
	$scope.errorMessage = "";
	$scope.loginBox = true;
	$scope.signupBoxStepOne = false;
	$scope.signupBoxStepTwo = false;
	$scope.resetPasswordBox = false;
	$scope.forgetPasswordBox = false;
	$scope.resetPasswordSuccessBox = false;
	$scope.customerDetailsBox=true;
	
	
	// var  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
    // var zipCodeRegex = new RegExp("^[1-9][0-9]{4,5;
    // var expRegex = new RegExp("^[0-9]{1,10}$");
    // var currencyRegex = new RegExp("^[a-zA-Z]*$");
    // var urlRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;
    // var docRegex = new RegExp("(.?)\.(docx|doc)$");

	$scope.doLogin = function(){
		 var loggedinUser;
		 var data = {
                        
                        "username": $scope.username,
                        "password": $scope.password
                    };
         var requestData = $scope.transformRequestForFormEncoded(data);
         var _config = {
				headers: {
							'Content-Type' : 'application/json'
						 }
			};
		var onSuccess = function(response){
				$scope.loggedinUser=response.data;
				loginDataService.setLoginData($scope.loggedinUser);
				
				if ($scope.loggedinUser.userType ==="CUSTOMER") {
					console.log(response.data.full_name);
                  // $window.location.href = "customerDashBoard.html";
				     $location.path('/custDashboard');
					//$route.reload();
					$window.location.reload();

                } else {
                         $location.path('/admin');
						 //$route.reload();
						 $window.location.reload();
						 
                       }
			console.log(response);
		};
		
	    var onError = function(error){
			console.log(error);	
            $scope.errorMessage = error.data.errorCode;		
			console.log($scope.errorMessage);
            $window.alert(error.data.errorCode);
            return false;			
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
			//"userType"  : $scope.userType,
			"userType" : "CUSTOMER"
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
				$scope.emailToken=$scope.step1Data.emailToken;
				$scope.signupBoxStepOne=false;
				$scope.signupBoxStepTwo=true;
				
			console.log(response);
			console.log($scope.step1Data.emailToken);
		};
		
		var onError = function(error){
			console.log(error);	
            $window.alert(error.data.errorCode);			
             //$scope.error = error.status;	
            return false;			 
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
			//"userType"		: $scope.userType,
			"userType"      :"CUSTOMER",
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
			$scope.emailToken='';
			if ($scope.User.userType === 'CUSTOMER') {
				  $location.path('/custDashboard');
				  $window.location.reload();
                } 
			else {
         			$location.path('/admin');
					//$route.reload();
					$window.location.reload();
						 
                  }
			
			console.log(response);
		};
		
		var onError = function(error){
			console.log(error);
            $window.alert(error.data.errorCode);
            return false;			
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
				$scope.emailToken=$routeParams.tokenId;
				$scope.loginBox = false;
				$scope.signupBoxStepTwo = true;
			}
			
			if($routeParams.tokenForPwd !== undefined ){
				console.log("tokenForPwd  is not undefined");
				$scope.passwordToken=$routeParams.tokenForPwd;
				$scope.loginBox = false;
				$scope.resetPasswordBox = true;
			}
		};
		
		var onError = function(error){
			console.log(error);
            $window.alert(error.data.errorCode);
            return false;			
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
			$window.alert(error.data.errorCode);
		};
		
		var onError = function(error){
			console.log(error);	
            $window.alert(error.data.errorCode);
            return false;			
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
            $window.alert(error.data.errorCode);
             return false;			
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
		        $scope.forogtPasswordData=response.data;
				$scope.emailToken=$scope.forogtPasswordData.emailToken;
				$scope.forgetPasswordBox = false;
				$scope.resetPasswordBox=true;
				
			     console.log(response);
		};
		
		var onError = function(error){
			console.log(error);
             //alert(error.message);
            $window.alert(error.data.errorCode);
            return false;			
		}
		
		$http.get('http://162.220.61.86:8080/printkaari-api/password/forgot?emailId='+$scope.email, data, _config).then(onSuccess, onError);
		
	}
	
	//Reset password
	$scope.ResetPassword = function(){
		var emailTokenId="";
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
				emailTokenId='';
				$scope.resetPasswordBox=false;				
				$scope.resetPasswordSuccessBox=true;
					
			     console.log(response);
		};
		
		var onError = function(error){
			//alert(error.message);
			$window.alert(error.data.errorCode);
			console.log(error);
            return false;			
		}
		
		if(angular.equals($scope.newPassword, $scope.confirmPwd)){
			
			console.log(angular.equals($scope.newPassword, $scope.confirmPwd));
			$http.put('http://162.220.61.86:8080/printkaari-api/password/reset', data, _config).then(onSuccess, onError);
		}
		else{
			$window.alert("New Password and Confirm Password are different");
		}
	}
	
	
	$scope.analyzeEmailId = function(email){
		var  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
		    $scope.isEmailIdvalid = "";
			if(angular.isDefined(email) && !reg.test(email)){
			  $scope.isEmailIdvalid = "Enter Valid Email Id";
			}
			else if(!angular.isDefined(email) || email === "" || email === null){
			  $scope.isEmailIdvalid = "Email Id is required";
			}
			else {
			$scope.isEmailIdvalid = "";
			}
	}	
	$scope.analayzePassword=function(pwd){
				//var reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{5,15}$/;
				var pwdReg=/^.{5,15}$/;
				$scope.isPasswordValid = "";
				
				//$window.alert(pwd.length);
			if(angular.isDefined(pwd) && !pwdReg.test(pwd)){
			   $scope.isPasswordValid = "Enter Valid Password of length between 5 to 15";
			}
			else if(!angular.isDefined(pwd) || pwd === "" || pwd === null ){
			  $scope.isPasswordValid = "Password is required  ";
			}
			else {
			$scope.isPasswordValid = "";
			}
				
	}
	
	$scope.isFieldValid=function(fieldStr){
		
		  $scope.isFieldStrValid="";
		  if(!angular.isDefined(fieldStr)|| fieldStr ==="" || fieldStr ===null){
			  
			 $scope.isFieldStrValid="This Field is Required"; 
		  }
	}

}]);

app.controller('loginDataController',['$scope', '$http', '$window', '$routeParams','loginDataService',function($scope,$http,$window, $routeParams,loginDataService){
	
	
	$scope.loginData = loginDataService.getLoginData();
	
}]);


app.controller('loginTabController',['$scope','$window','$location','loginDataService', function($scope,$window,$location,loginDataService){
	    
		
	    $scope.isLogin = false;
	    $scope.init = function(){
		    $scope.errorMessage = "";	
			$scope.data = loginDataService.getLoginData();
			if(angular.isUndefined($scope.data)){
					$scope.isLogin=false;
			}
			else{
					$scope.isLogin=true;
					$scope.loginData = $scope.data;
				}
				if(isValidData($scope.data)){
					//$scope.isLogin = true;				
					console.log("inside loginTabController isLogin=true");
				}
		}
	
	$scope.init();
	$scope.logout=function(){		
				
		console.log("clearing all data");
		console.log($window.localStorage.loginData);
		$window.localStorage.clear();
		$window.alert("You Have Logged out Success Fully redirect to Home");
		console.log($window.localStorage.loginData);
		$location.path('/logout');
		//$route.reload();
		$window.location.reload();
		
	}

	     function isValidData(data){

		       if(data === 'undefined'){
			return false;
		}

		// check validation of data
		return true;
	}
	$scope.userDeatils = function(){
		
		var _config = {
                   headers: {'Content-Type' : 'application/json'}
		             };		 
					 
		var onSuccess = function(response){
			    $scope.loggedinUserDetails=response.data;
				
				$scope.customerDetailsBox=true	;
					
			     console.log(response);
		};
		
		var onError = function(error){
			//alert(error.message);
			$window.alert(error.data.errorCode);
			console.log(error);
            return false;			
		}
			$http.put('http://162.220.61.86:8080/printkaari-api/customers/profile'+$scope.userMail, data, _config).then(onSuccess, onError);
		
	
	
		
		
	};

}]);

app.controller('dashboardController', ['$scope', function(){
	// abhi toh party suru hui h
		
}]);

app.service('loginDataService', function($window){
	
	var service = this;
	var loginData;
	
	service.setLoginData = function(data){
		$window.localStorage.loginData = JSON.stringify(data);			
	};
		
    service.getLoginData = function(){
		if(angular.isDefined($window.localStorage.loginData)){
			return JSON.parse($window.localStorage.loginData);
		}else{
			return undefined;
		}
		
	};
		
});
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {templateUrl: 'partials/login.html',   controller: 'loginController'})
	.when('/emailtoken/:tokenId', {templateUrl: 'partials/login.html',   controller: 'loginController'})
	.when('/reset-password/:tokenForPwd' ,{templateUrl: 'partials/login.html',   controller: 'loginController'})
	.when('/custDashboard' ,{templateUrl: 'partials/custDashboard.html',   controller: 'dashboardController'})
	.when('/admin' ,{templateUrl: 'partials/empDashboard.html',   controller: 'dashboardController'})
	.when('/logout' ,{redirectTo: '/login.html'})
	.otherwise({redirectTo: '/' });

}]);