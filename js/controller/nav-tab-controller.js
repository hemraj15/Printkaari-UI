app.controller('navTabController',['$window','$location','authService', '$rootScope', function($window,$location,authService, $rootScope){
	    
	var navCtl = this;
	navCtl.isLogin = false;
    
    /*
    While page load this init function check for tokens, if exists then it will display the profile
     */
    navCtl.init = function(){
		var data = authService.getAuthData();
	
		if(data){
			navCtl.isLogin=true;
			navCtl.loginData = data;
		}
	}
	
	/*
	 logout function should not concern with user activity,
	 it enchance user xp
	 */
	navCtl.logout=function(){		
		
		authService.clearAuthData();
		$window.alert("You Have Logged out Success Fully redirect to Home");
		navCtl.isLogin = false;
		navCtl.loginData = {};	
	}

	/*
	To update nav-bar whenever login happen 
	 */
	$rootScope.$on('login', function(event, data){
		navCtl.init();
	});
   	
	this.init();
}]);

