/**
 * @author Kamlesh Uikey
 *
 * This file contain xhr request required for making auth related work
 */

app.factory('paymentFactory', ['$http', function($http){
	var paymentFactory = {},
	baseUrl = 'http://162.220.61.86:8080/printkaari-api/',
	config = {};

	
	paymentFactory.updateTransaction = function(orderId, params){
		return $http.post(baseUrl + 'customers/confirm-college-order/' + orderId, params);
	}

	paymentFactory.initiateTransaction = function(orderId){
		return $http.get(baseUrl + 'payment/getCreds/' + orderId);
	}
	
	return paymentFactory;
}]);