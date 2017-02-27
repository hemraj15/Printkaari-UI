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
