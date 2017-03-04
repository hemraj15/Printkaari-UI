
 
app.factory('httpRequestInterceptor', ['authService', function (authService) {
	
	return {
		request: function (config) {

			if(authService.getAccessToken()){
				config.headers['Authorization'] = 'Bearer ' + loginDataService.getAccessToken;
			}
			// config.headers['Accept'] = 'application/json;odata=verbose';

			return config;
		}
	};
}]);
