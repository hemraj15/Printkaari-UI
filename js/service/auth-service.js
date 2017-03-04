app.service('authService',['store', function(store){
	
	var service = this;
	
	service.setAuthData = function(data){
		store.set('authData', data);
		service.initAuthData();			
	};

	service._initAuthData = function(){
		service.authData = store.get('authData');
	}
		
    service.getAuthData = function(){
    	
		if(service._doHaveValidAuthData()){
			return service.authData;
		}

		return false;
	};

	service.clearAuthData = function(){
		store.remove('authData');
	};

	service.getAccessToken = function(){

		if(service._doHaveValidAuthData()){
			
			return service.authData.access_token;
		}

		return false;
	}

	service._doHaveValidAuthData = function(){

		if(angular.isDefined(service.authData) && angular.isObject(service.authData) && service._isNotExpired()){
			return true;
		}

		return false;
	}

	service._isNotExpired = function(){

		if(true){
			return true;
		}

		return false;
	}
	
	service._initAuthData();
}]);
