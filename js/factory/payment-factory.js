/**
 * @author Kamlesh Uikey
 *
 * This file contain xhr request required for making auth related work
 */

app.factory('paymentFactory', ['$http', function($http){
	var paymentFactory = {},
	baseUrl = 'http://162.220.61.86:8080/printkaari-api/',
	config = {
		headers: {
		'Content-Type' : 'application/json'
		'Authorization' : ''
		}
	};

	
	paymentFactory.getMerchantCreds = function(){
		return $http.get(baseUrl + 'payment/getCreds' );
	}

	paymentFactory.resetPassword = function(params){
		return $http.put(baseUrl + 'password/reset', params, config);
	}
	
	return paymentFactory;
}]);