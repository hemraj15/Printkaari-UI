/**
 * @author Kamlesh Uikey
 *
 * This file contain xhr request required for making auth related work
 */

app.factory('authFactory', ['$http', function($http){
	var authFactory = {},
	baseUrl = 'http://printkaari.com:8080/printkaari-api/',
	config = {
		headers: {
		'Content-Type' : 'application/json'
		}
	};

	authFactory.login = function(params){

		return $http.post(baseUrl + 'app/login', params, config);
	}; 

	authFactory.intiateSignUp = function(params){
		
		return $http.post(baseUrl + 'signup/initiate', params, config);
	};

	authFactory.completeSignUp = function(params){
		return $http.post(baseUrl + 'signup/complete', params, config);
	}

	authFactory.forgetPassword = function(emailId){
		return $http.get(baseUrl + 'password/forgot?emailId=' + emailId );
	}

	authFactory.resetPassword = function(params){
		return $http.put(baseUrl + 'password/reset', params, config);
	}
	
	return authFactory;
}]);