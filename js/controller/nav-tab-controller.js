app.controller('navTabController',['$window','$location','loginDataService', '$rootScope', function($window,$location,loginDataService, $rootScope){
	    
	var navCtl = this;
	this.isLogin = false;
    
    /*
    While page load this init function check for tokens, if exists then it will display the profile
     */
    this.init = function(){
		var data = loginDataService.getLoginData();
	
		if(isValidData(data)){
			this.isLogin=true;
			this.loginData = data;
		}
	}

	$rootScope.$on('login', function(event, data){
		navCtl.init();
	});
	
	this.logout=function(){		
				
		$window.localStorage.clear();
		$window.alert("You Have Logged out Success Fully redirect to Home");
		$location.path('/logout');
		$window.location.reload();
		
	}

    function isValidData(data){

	    if(angular.isUndefined(data)){
			return false;
		}

		// check validation of data
		return true;
	}
	
	this.init();
}]);

