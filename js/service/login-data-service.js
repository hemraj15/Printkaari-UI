app.service('loginDataService',['store', function(store){
	
	var service = this;
	
	service.setLoginData = function(data){
		store.set('loginData', data);			
	};
		
    service.getLoginData = function(){
    	
    	var loginData = store.get('loginData');
		
		if(angular.isDefined(loginData)){
			return loginData;
		}

		return undefined;
	};

	service.clearLoginData = function(){
		store.remove('loginData');
	};
		
}]);
