
 
app.factory('httpRequestInterceptor', ['authService', function (authService) {
	
	return {
		request: function (config) {

			console.log(config.url);

			if(authService.getAccessToken() && config.method == 'POST'){
				config.headers['Authorization'] = 'Bearer ' + authService.getAccessToken();
			}
			// config.headers['Accept'] = 'application/json;odata=verbose';

			return config;
		}
	};
}]);
