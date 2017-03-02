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
	
	/*
	 logout function should not concern with user activity,
	 it enchance user xp
	 */
	this.logout=function(){		
				
		$window.localStorage.clear();
		$window.alert("You Have Logged out Success Fully redirect to Home");
		this.isLogin = false;
		this.loginData = {};	
	}

	/*
	To update nav-bar whenever login happen 
	 */
	$rootScope.$on('login', function(event, data){
		navCtl.init();
	});
   
    function isValidData(data){

	    if(angular.isUndefined(data)){
			return false;
		}

		// check validation of data
		return true;
	}
	
	this.init();
}]);

