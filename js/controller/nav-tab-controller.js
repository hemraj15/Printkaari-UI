app.controller('navTabController',['$window','$location','loginDataService', function($window,$location,loginDataService){
	    
		
	this.isLogin = false;
    
    this.init = function(){
	    this.errorMessage = "";	
		this.data = loginDataService.getLoginData();
		if(angular.isUndefined(this.data)){
				this.isLogin=false;
		}
		else{
				this.isLogin=true;
				this.loginData = $scope.data;
			}
			if(isValidData(this.data)){
				//$scope.isLogin = true;				
				console.log("inside loginTabController isLogin=true");
			}
	}
	
	this.logout=function(){		
				
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
	
	this.userDeatils = function(){
		
		var _config = {
                   headers: {'Content-Type' : 'application/json'}
		             };		 
					 
		var onSuccess = function(response){
			    this.loggedinUserDetails=response.data;
				
				this.customerDetailsBox=true	;
					
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

